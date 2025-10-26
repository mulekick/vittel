/**
 * Feature-specific express middleware.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Middlewares that call the protected API and use middleware wrapper for error routing.
 */

/* eslint-disable security/detect-object-injection */

// import modules
import config from "../../config.ts";
import {wrapMiddlewareExpress} from "@vittel/utils";
import {issueToken, validateToken, getFallback} from "../../domain/transactions/protected.ts";

// import types
import type {RequestHandler} from "express";

// destructure config values
const {APP_ENABLE_HTTPS, APP_COOKIE_NAME} = config;

/**
 * Delivers a token everytime, equivalent to the '/login' route
 * @see {@link issueToken | Issue a token}
 */
export const mToken: RequestHandler = (...args) => wrapMiddlewareExpress(async(req, res, next) => {
    // initialize domain transaction
    const transaction = await issueToken();
    // response
    res.cookie(APP_COOKIE_NAME, transaction, {
        // anecdotal, its max age is 60 seconds server-side
        expires: new Date(Date.now() + 3.6e6),
        // prevent client-side javascript from accessing
        // the cookie even if not using fetch
        httpOnly: true,
        // allow serving cookies in plain http if https disabled ...
        secure: APP_ENABLE_HTTPS,
        // do not send cookie to third party requests
        // (different domain and / or protocol)
        sameSite: `strict`
    })
        // no data transmission
        .status(201).end();
})(...args);

/**
 * Protection middleware, verifies JWT validity
 * @see {@link validateToken | Validate a token}
 */
export const mProtection: RequestHandler = (...args) => wrapMiddlewareExpress(async(req, res, next) => {
    // initialize domain transaction
    await validateToken((req.cookies as Record<string, string>)[APP_COOKIE_NAME]);
    // proceed to next middleware
    next();
})(...args);

/**
 * Fallback middleware
 * @see {@link getFallback | Get fallback data}
 */
export const mFallback: RequestHandler = (...args) => wrapMiddlewareExpress((req, res, next) => {
    // initialize domain transaction
    const transaction = getFallback();
    // response
    res.status(200).send(transaction);
})(...args);