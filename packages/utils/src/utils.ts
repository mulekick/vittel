/**
 * Node.js based shared utility functions.
 * @module
 * @showCategories
 * @categoryDescription 1. Async local storage
 * - Manages the persistence of values during async call chains that may involve multiple services.
 * @categoryDescription 2. Async local storage middlewares
 * - Framework-specific middlewares enabling async local storage support for incoming requests.
 * @categoryDescription 3. Try / catch wrappers
 * - Wrapper functions that add error handling support to framework-specific middlewares.
 * @categoryDescription 4. Logging
 * - Provides centralized, feature agnostic logging features.
 * @categoryDescription 5. Miscellaneous
 * - Provides centralized, feature agnostic miscellaneous features.
 * @remarks
 * - Scope : GENERAL
 * - Utility functions that cover all app layers (controller, domain and data).
 * - Centralized in a dedicated package to avoid code redundancy across packages.
 * - Domain-specific functions will be declared at the package scope.
 * - This module can only be imported in node.js based packages since it imports node primitives.
 */

/* eslint-disable security/detect-object-injection */

// import primitives
import {AsyncLocalStorage} from "node:async_hooks";
import {randomUUID} from "node:crypto";
import EventEmitter from "node:events";

// import modules
import {pino, transport} from "pino";
import {pinoHttp} from "pino-http";
import {domainEvents} from "@vittel/types/enums";
import {rnd} from "./common.js";
import {handleError} from "./errors.js";

// import types
import type {RequestHandler} from "express";
import type {DestinationStream, Logger} from "pino";
import type {HttpLogger} from "pino-http";
import type {FakeMessage} from "@vittel/types";

/**
 * Key used for storing correlation ID in the async local storage.
 * @remarks
 * - Used as an http header as well for cross service requests.
 * @category 1. Async local storage
 */
export const CORRELATION_ID_KEY = `x-correlation-id`;

/**
 * Init async local storage.
 * @remarks
 * - Init with a map object to persist multiple values if needed.
 * @category 1. Async local storage
 */
export const asyncLocalStorage: AsyncLocalStorage<Map<string, string>> = new AsyncLocalStorage<Map<string, string>>();

/**
 * Sync function that sets the correlation id for current async calls chain.
 * @category 1. Async local storage
 * @param id - The current correlation id if the call chain was initiated from another service.
 * @throws Throws a generic error if async local storage is not initialized.
 */
export const setCorrelationId = (id: string | undefined): void => {
    const store = asyncLocalStorage.getStore();
    if (!(store instanceof Map))
        throw new Error(`async local storage not initialized.`);
    store.set(CORRELATION_ID_KEY, String(id || randomUUID()));
};

/**
 * Sync function that retrieves the correlation id for current async calls chain.
 * @category 1. Async local storage
 * @returns The current correlation id.
 * @throws Throws a generic error if async local storage is not initialized or if the id is not found.
 */
export const correlationId = (): string => {
    const store = asyncLocalStorage.getStore();
    if (!(store instanceof Map))
        throw new Error(`async local storage not initialized.`);
    const id = store.get(CORRELATION_ID_KEY);
    if (typeof id !== `string` || !id.length)
        throw new Error(`correlation id not found for the current request.`);
    return id;
};

/**
 * Express middleware that exposes async local storage to incoming http requests.
 * @category 2. Async local storage middlewares
 * @remarks
 * - Pass request header in the event the initial transaction originates from another service.
 * - `route` is passed only for typescript compliance, should be painless but beware.
 */
export const setRequestLocalsExpress: RequestHandler = (req, res, next) => {
    const h = req.headers[CORRELATION_ID_KEY];
    asyncLocalStorage.run(new Map(), (f, id) => {
        setCorrelationId(id);
        f(`route`);
    }, next, typeof h === `string` && h.length ? h : undefined);
};

/**
 * Sync wrapper that adds error handling support to express middlewares.
 * @category 3. Try / catch wrappers
 * @param mid - The original express middleware (sync or async).
 * @returns The wrapped middleware.
 * @remarks
 * - Uses a functional programming pattern (higher order function).
 */
export const wrapMiddlewareExpress = (mid: RequestHandler): RequestHandler => async(req, res, next) => {
    try {
        // run middleware
        await mid(req, res, next);
    } catch (err: unknown) {
        // delegate to error handling middleware
        // eslint-disable-next-line n/callback-return
        next(err);
    }
};

/**
 * Middleware-like function that exposes async local storage to the message queue.
 * @category 2. Async local storage middlewares
 * @remarks
 * - Mimics the behavior of express middlewares, called for each incoming messages.
 * - In the event some transaction id is included in the message, it can be assigned to h.
 * - Message handler needs to be updated once an actual message queue is used.
 */
export const setRequestLocalsFakeMessageQueue = (next: MessageHandler, ...args: Parameters<MessageHandler>): Promise<void> => {
    const h = undefined;
    return asyncLocalStorage.run(new Map(), (f, id) => {
        setCorrelationId(id);
        return f(...args);
    }, next, h);
};

/**
 * Sync wrapper that adds error handling support to message queue middlewares.
 * @category 3. Try / catch wrappers
 * @param mid - The message queue middleware (sync or async).
 * @returns The wrapped middleware.
 * @remarks
 * - Uses a functional programming pattern (higher order function).
 * - Middleware type needs to be updated once an actual message queue is used.
 */
export const wrapMiddlewareFakeMessageQueue = (mid: MessageHandler): MessageHandler => async(...args) => {
    try {
        // run middleware
        await mid(...args);
    } catch (err: unknown) {
        // route error to general error handler ...
        void handleError(err);
    }
};

/**
 * Specify outputs to write logs to using pino transports.
 * @category 4. Logging
 * @remarks
 * 1. Local log file / observability service endpoint etc, discard for now.
 * 2. Stdout, use options to prettify the output.
 */
export const logWritables = transport({
    targets: [ {
        target: `pino/file`,
        options: {destination: `/dev/null`}
    }, {
        target: `pino-pretty`,
        options: {
            colorize: true,
            translateTime: `UTC:yyyy-mm-dd HH:MM:ss.l o`,
            messageFormat: `{if req}{req.id}{end}{if id}{id}{end}: {msg} {if req}[{req.remoteAddress} {req.method} {req.url} -> {res.statusCode}]{end}`,
            // ignore err here to discard the stack from prettify for all errors (check json output for stacks)
            ignore: `req,res,responseTime,id,err`
        }
    } ]
}) as DestinationStream;

// mute errors for HTTP 500 in controller here (always the same stack ...)

/**
 * Constant that will instantiate the pino logger and pipe it to the outputs.
 * @category 4. Logging
 */
export const logger: Logger = pino(logWritables);

/**
 * Wrapper around the main logger for use as an express logging middleware.
 * @category 4. Logging
 */
export const httpLogger: HttpLogger = pinoHttp({
    // define a custom request id function
    genReqId: () => correlationId(),
    // fine tune log levels
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500)
            return `warn`;
        else if (res.statusCode >= 500 || err)
            return `error`;
        else if (res.statusCode >= 300 && res.statusCode < 400)
            return `silent`;
        return `info`;
    },
    logger
});

/**
 * Signature for message queue middlewares.
 * @category 5. Miscellaneous
 * @useDeclaredType
 * @remarks
 * - Needs to be updated once a genuine message queue / no message queue at all is used.
 */
export type MessageHandler = (mq: FakeMessageQueue, msg: unknown)=> Promise<void>;

/**
 * Mocks a message queue
 * - Generates messages and mocks the send() method of an actual message queue.
 * - Imported by the controller layer of the backend service so as to subscribe to it.
 * - This class can be discarded once a genuine message queue / no message queue at all is used.
 * @category 5. Miscellaneous
 * @class
 */
export class FakeMessageQueue extends EventEmitter {

    /**
     * Emitted when a new message arrives on the message queue.
     * @eventProperty
     */
    static readonly MESSAGE = `message`;

    /**
     * Mocks "process incoming data" events.
     */
    private static toProcess = [ `Some event`, `Another event`, `One more event` ];

    /**
     * Mocks "persist incoming data" events.
     */
    private static toPersist = [ 1555263, 98766300, 10000065 ];

    /**
     * Sync: creates a fake incoming message.
     */
    static createMessage(): FakeMessage {
        const [ x, y ] = [ rnd(0, 3), rnd(0, 2) ];
        return {
            event: (x ? domainEvents.EVT_PROCESS_DATA : domainEvents.EVT_PERSIST_DATA) as domainEvents,
            data: x ? FakeMessageQueue.toProcess[y] : FakeMessageQueue.toPersist[y]
        };
    }

    /**
     * Sync: simulates sending a message on the queue.
     */
    send(channel: string, message: unknown): void {
        logger.info({id: correlationId()}, `[message queue] sending event ${ JSON.stringify(message) } on channel ${ channel }`);
        void this;
    }
}