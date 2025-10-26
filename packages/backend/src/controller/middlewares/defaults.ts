/**
 * Default express middlewares.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Default fallback middleware and error request handler for express.
 */

// import modules
import {z} from "zod";
import {wrapMiddlewareExpress} from "@vittel/utils";
import {DomainError, handleError, domainErrors} from "@vittel/utils/errors";

// import types
import type {RequestHandler, ErrorRequestHandler} from "express";

/**
 * Sync: app-wide default fallback middleware, uses wrapper for error routing
 */
export const defaultFallback: RequestHandler = (...args) => wrapMiddlewareExpress((req, res, next) => {
    // response
    res.status(404).send(`requested resource is nowhere to be found 😭`);
})(...args);

/**
 * Async: app-wide error handling middleware (must match ErrorRequestHandler function type)
 * @see {@link handleError | General error handler}
 */
export const errorHandling: ErrorRequestHandler = async(err, req, res, next) => {
    if (!res.headersSent) {
        // domain errors
        if (err instanceof DomainError) {
            switch (err.type) {
            // send a 401 on failed authentication
            case domainErrors.USER_AUTHENTICATION_FAILED :
                res.status(401).send(err.message);
                break;
            // send a 400 on failed file upload
            case domainErrors.FILE_UPLOAD_FAILED :
                res.status(400).send(err.message);
                break;
            // send a 500 programmer error ...
            default :
                res.status(500).send(`unrecognized error 💀`);
                break;
            }
        // parsing / runtime / dependencies etc errors
        } else {
            // send a 500 in this case
            res.status(500).send(err instanceof z.ZodError ?
                `parsing error: ${ err.issues.map(x => x.message).join(`\n`) } 🤬` :
                `unexpected error '${ err instanceof Error ? err.message : `unknown` }' 😱`);
        }
    }
    // call general error handler
    await handleError(err as unknown);
    // eslint compliance
    return undefined;
};