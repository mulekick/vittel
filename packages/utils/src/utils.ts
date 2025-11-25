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
 * @categoryDescription 5. Data access
 * - Allows exported shared database access functions.
 * - Functions are imported in packages and bound to package-specific clients using the "data accessor" pattern.
 * @remarks
 * - Scope : GENERAL
 * - Utility functions that cover all app layers (controller, domain and data).
 * - Centralized in a dedicated package to avoid code redundancy across packages.
 * - This module can only be imported in node.js based packages since it imports node primitives.
 * - TODO : export a wrapper class for db client, pass client instance to the contructor :
 *   1. Client is instantiated in backend package data layer (npm packages do not include configs)
 *   2. Data accessors are implemented as methods of the wrapper class, `DataAccessor` type may become superfluous.
 */

// import primitives
import {AsyncLocalStorage} from "node:async_hooks";
import {randomUUID} from "node:crypto";

// import modules
import {pino, transport} from "pino";
import {pinoHttp} from "pino-http";
import {handleError} from "./errors.js";
import {FakeDatabaseClient} from "./mocks.js";

// import types
import type {WriteStream} from "node:fs";
import type {RequestHandler} from "express";
import type {MessageHandler} from "./mocks.js";
import type {DestinationStream, Logger} from "pino";
import type {HttpLogger} from "pino-http";

/**
 * Key used for storing correlation ID in async local storage.
 * @remarks
 * - Used as an http header as well as for cross service requests.
 * @category 1. Async local storage
 */
export const CORRELATION_ID_KEY = `x-correlation-id`;

/**
 * Init async local storage.
 * @remarks
 * - Init with a map object to persist multiple values if needed.
 * - Does not need specific configuration so it can be created as a side effect.
 * @category 1. Async local storage
 */
export const asyncLocalStorage: AsyncLocalStorage<Map<string, string>> = new AsyncLocalStorage<Map<string, string>>();

/**
 * Set the correlation id for current async calls chain.
 * @category 1. Async local storage
 * @param id - Current correlation id if the call chain was initiated from another service.
 * @throws Throws a generic error if async local storage is not initialized.
 */
export const setCorrelationId = (id: string | undefined): void => {
    const store = asyncLocalStorage.getStore();
    if (!(store instanceof Map))
        throw new Error(`async local storage not initialized.`);
    store.set(CORRELATION_ID_KEY, id || randomUUID());
};

/**
 * Retrieve the correlation id for current async calls chain.
 * @category 1. Async local storage
 * @returns Current correlation id.
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
    // eslint-disable-next-line security/detect-object-injection
    const h = req.headers[CORRELATION_ID_KEY];
    asyncLocalStorage.run(new Map(), (f, id) => {
        setCorrelationId(id);
        f(`route`);
    }, next, typeof h === `string` && h.length ? h : undefined);
};

/**
 * Sync wrapper that adds error handling support to express middlewares.
 * @category 3. Try / catch wrappers
 * @param mid - Original express middleware (sync or async).
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
 * Middleware-like hook function that exposes async local storage to the message queue.
 * @category 2. Async local storage middlewares
 * @remarks
 * - Mimics the behavior of express middlewares, called for each incoming messages.
 * - In the event some transaction id is included in the message, it can be assigned to h.
 * - Message handler needs to be updated once an actual message queue is used.
 */
export const setRequestLocalsFakeMessageQueue = (next: MessageHandler, ...args: Parameters<MessageHandler>): void => {
    const h = undefined;
    asyncLocalStorage.run(new Map(), (f, id) => {
        setCorrelationId(id);
        void f(...args);
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
 * - Does not need specific configuration so it can be created as a side effect.
 * - Prints logs to :
 *   1. Local log file / observability service endpoint etc.
 *   2. Stdout, use options to prettify the output.
 */
export const logWritables = transport({
    targets: [ {
        target: `pino/file`,
        options: {
            // discard for now
            destination: `/dev/null`
        }
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
 * @remarks
 * - Does not need specific configuration so it can be created as a side effect.
 */
export const logger: Logger = pino(logWritables);

/**
 * Wrapper around the main logger for use as an express logging middleware.
 * @category 4. Logging
 * @remarks
 * - Does not need specific configuration so it can be created as a side effect.
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
 * Create database client instance
 * @category 5. Data access
 */
export const createDbClient = (databaseConfig: Record<string, unknown>): FakeDatabaseClient => {
    void databaseConfig;
    return new FakeDatabaseClient();
};

/**
 * Emulate database read (public)
 * @category 5. Data access
 */
export const getRandomData = (dbClient: FakeDatabaseClient): Promise<string> => dbClient.randomData();

/**
 * Emulate database read (public)
 * @category 5. Data access
 */
export const getPublicData = (dbClient: FakeDatabaseClient): string => dbClient.publicData();

/**
 * Emulate database read (protected)
 * @category 5. Data access
 */
export const getProtectedData = (dbClient: FakeDatabaseClient): string => dbClient.protectedData();

/**
 * Create a writable stream
 * @category 5. Data access
 */
export const getWritableStreamToFile = (dbClient: FakeDatabaseClient): WriteStream => dbClient.writableStreamToFile();