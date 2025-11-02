/**
 * Feature-specific express middleware.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Middlewares that call the file upload API and use middleware wrapper for error routing.
 */

// import primitives
import {once} from "node:events";

// import modules
import busboy from "busboy";
import {wrapMiddlewareExpress} from "@vittel/utils";
import {createUploader, getUploadResult} from "../../domain/transactions/upload.ts";

// import types
import type {RequestHandler} from "express";

/**
 * Async file upload middleware
 * - Advanced example of strict isolation of the controller layer from the domain layer
 * - The `Uploader` object (domain) consumes the readable stream returned by busboy (controller)
 * - See https://github.com/mscdex/busboy?tab=readme-ov-file#special-parser-stream-events
 * - Using a class allows for additional processing (read the total upload size)
 * @see {@link createUploader | Upload a file}
 * @see {@link getUploadResult | Get upload results}
 */
export const mUpload: RequestHandler = wrapMiddlewareExpress(async(req, res, next) => {
    // multipart data processing library
    const bb = busboy({headers: req.headers});
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    bb.on(`file`, async(_name, file, info) => {
        try {
            // create domain writable
            const upload = createUploader(info.filename, info.mimeType);
            // IMPORTANT : route domain errors back to library
            upload.on(`error`, err => {bb.emit(`error`, err);});
            // send file to domain
            file.pipe(upload);
            // wait for completion
            await once(upload, `close`);
            // initialize domain transaction and return
            res.status(200).send(getUploadResult(upload));
        } catch (err) {
            // delegate to error handling middleware
            // eslint-disable-next-line n/callback-return
            next(err);
        }
    });
    // process upload
    req.pipe(bb);
    // IMPORTANT : wait for library to actually finish processing before returning
    await once(bb, `close`);
});