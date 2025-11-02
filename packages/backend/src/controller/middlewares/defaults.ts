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
export const defaultFallback: RequestHandler = wrapMiddlewareExpress((req, res) => {
    // response
    res.status(404).send(`requested resource is nowhere to be found 😭`);
});

/**
 * Async: app-wide error handling middleware (must match ErrorRequestHandler function type)
 * @see {@link handleError | General error handler}
 * @remarks
 * - **_Caution : the `next` parameter must be present for the errors to route correctly._**
 */
export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
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
        // parsing errors
        } else if (err instanceof z.ZodError) {
            res.status(500).send(`parsing error: ${ err.issues.map(x => x.message).join(`\n`) } 🤬`);
        // runtime / dependencies etc errors
        } else {
            res.status(500).send(`unexpected error '${ err instanceof Error ? err.message : `unknown` }' 😱`);
        }
    }
    // ignore default express handler, call general error handler
    void next;
    void handleError(err as unknown);
};