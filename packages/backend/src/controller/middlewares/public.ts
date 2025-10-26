/**
 * Feature-specific express middleware.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Middlewares that call the public API and use middleware wrapper for error routing.
 */

// import modules
import {wrapMiddlewareExpress} from "@vittel/utils";
import {getData, getFallback} from "../../domain/transactions/public.ts";

// import types
import type {RequestHandler} from "express";

/**
 * Async data fetching middleware
 * @see {@link getData | Get public data}
 */
export const mFetch: RequestHandler = (...args) => wrapMiddlewareExpress(async(req, res, next) => {
    // initialize domain transaction
    const transaction = await getData();
    // response
    res.status(200).json(transaction);
})(...args);

/**
 * Sync fallback middleware
 * @see {@link getFallback | Get fallback data}
 */
export const mFallback: RequestHandler = (...args) => wrapMiddlewareExpress((req, res, next) => {
    // initialize domain transaction
    const transaction = getFallback();
    // response
    res.status(200).send(transaction);
})(...args);