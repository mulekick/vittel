/**
 * Feature-specific express middleware.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Middlewares that call the error handling patterns API and use middleware wrapper for error routing.
 */

// import modules
import {wrapMiddlewareExpress} from "@vittel/utils";
import {throwError, emitError} from "../../domain/transactions/errors.ts";

// import types
import type {RequestHandler} from "express";

/**
 * Sync: trigger error in domain
 * @see {@link throwError | Throw error (sync)}
 */
export const mThrowError: RequestHandler = wrapMiddlewareExpress((req, res) => {
    // initialize domain transaction
    const transaction = throwError();
    // response
    res.status(200).send(transaction);
});

/**
 * Async: trigger error in domain, event emitter emits error, promise rejects
 * @see {@link emitError | Emit error (async)}
 */
export const mEmitError: RequestHandler = wrapMiddlewareExpress(async(req, res) => {
    // initialize domain transaction
    const transaction = await emitError();
    // response
    res.status(200).send(transaction);
});