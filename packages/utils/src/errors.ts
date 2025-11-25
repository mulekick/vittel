/**
 * Layer-agnostic errors management.
 * @module
 * @remarks
 * - Scope : GENERAL
 * - Custom error classes and global error handlers.
 * - Manages the routing of errors across all app layers to a centralized location.
 * - All errors, exceptions and rejected promises will eventually be routed to those handlers.
 * - This module can only be imported in node.js based packages since it imports node primitives.
 */

// import primitives
import process from "node:process";

// import modules
import {z} from "zod";
import {domainErrors} from "@vittel/types/enums";
import {correlationId, logger} from "./utils.js";

// import types
import type {AsyncError, TransactionError} from "@vittel/types";

/**
 * Reexport the domain errors enum for convenience.
 */
export {domainErrors};

/**
 * Custom error class for identified domain errors.
 * @class
 * @property type - Domain error that occured during the transaction.
 * @property payload - Payload associated with the error, unrelated to the original transaction payload.
 * @remarks
 * - Any error happening in an external library will be forwarded as is to the error handler.
 */
export class DomainError extends Error implements TransactionError {
    public readonly type: domainErrors;
    public readonly payload: unknown;
    constructor(message: string, type: domainErrors, payload: unknown) {
        super(message);
        // typescript specific prototype chain restoration ...
        Object.setPrototypeOf(this, new.target.prototype);
        this.type = type;
        this.payload = payload;
    }
}

/**
 * Custom error class for unhandled rejected promises.
 * @class
 * @property id - Correlation id for the async call chains where the promise rejected.
 * @remarks
 * - Restores the original stack of the error the promise rejected with.
 * - Used only in the server unhandled rejections handler.
 */
export class UnhandledRejectionError extends Error implements AsyncError {
    public readonly id: string;
    constructor(message: string, id: string, stack: string | undefined) {
        super(message);
        // typescript specific prototype chain restoration ...
        Object.setPrototypeOf(this, new.target.prototype);
        this.id = id;
        this.stack = stack;
    }
}

/**
 * General error handler: async function for centralized and consistent error handling.
 * @param err - Error to process (prefer unknown to not let requests time out).
 * @remarks
 * - Log warn for domain errors since they were anticipated by construction
 * - Log error for any unanticipated error (parsing, runtime, etc)
 */
export const handleError = async(err: unknown): Promise<void> => {
    // domain errors
    if (err instanceof DomainError)
        logger.warn({id: correlationId(), err}, `domain error '${ err.message }' 💀`);
    // parsing errors
    else if (err instanceof z.ZodError)
        logger.error({id: correlationId(), err}, `parsing error: ${ err.issues.map(x => x.message).join(`\n`) } 🤬`);
    // runtime / dependencies etc errors
    else
        logger.error({id: correlationId(), err}, `unexpected error '${ err instanceof Error ? err.message : `unknown` }' 😱`);
    // emulate async external logging etc
    await new Promise(r => {setImmediate(r);});
};

/**
 * Route unhandled promise rejections to last resort handler.
 * @param err - Error to process.
 * @param p - The promise that rejected with this error.
 * @remarks
 * - Discards rejected promise, logs and rethrows.
 */
export const unhandledRejection = (err: unknown, p: Promise<unknown>): void => {
    void p;
    logger.error({id: correlationId(), err}, `unhandled promise rejection: '${ err instanceof Error ? err.message : `unknown` }' ☠️`);
    throw err instanceof Error ? new UnhandledRejectionError(err.message, correlationId(), err.stack) : err;
};

/**
 * Log the exception and exits in the event regular error handling throws (unhandled).
 * @param err - Error to process.
 * @param exceptionOrigin - The exception origin.
 * @remarks
 * - Logs the exception with correlation id if available, then fails and exits.
 */
export const uncaughtException = (err: unknown, exceptionOrigin: NodeJS.UncaughtExceptionOrigin): void => {
    logger.error(err instanceof UnhandledRejectionError ? {id: err.id, err} : err, `unhandled exception: ${ err instanceof Error ? err.message : `unknown` } - origin: ${ exceptionOrigin }\n`);
    process.exit(1);
};