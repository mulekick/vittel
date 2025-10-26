/**
 * Feature-specific express middleware.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Middlewares that call the error handling patterns API and use middleware wrapper for error routing.
 */

/* eslint-disable n/no-sync */

// import modules
import {wrapMiddlewareExpress} from "@vittel/utils";
import {throwErrorSync, emitErrorAsync} from "../../domain/transactions/errors.ts";

// import types
import type {RequestHandler} from "express";

/**
 * Sync: trigger error in domain
 * @see {@link throwErrorSync | Throw error (sync)}
 */
export const mThrowErrorSync: RequestHandler = (...args) => wrapMiddlewareExpress((req, res, next) => {
    // initialize domain transaction
    const transaction = throwErrorSync();
    // response
    res.status(200).send(transaction);
})(...args);

/**
 * Async: trigger error in domain, event emitter emits error, promise rejects
 * @see {@link emitErrorAsync | Emit error (async)}
 */
export const mEmitErrorAsync: RequestHandler = (...args) => wrapMiddlewareExpress(async(req, res, next) => {
    // initialize domain transaction
    const transaction = await emitErrorAsync();
    // response
    res.status(200).send(transaction);
})(...args);