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
import {createFileUploader, getUploadResult} from "../../domain/transactions/upload.ts";

// import types
import type {RequestHandler} from "express";

/**
 * Async file upload middleware
 * - Advanced example of strict isolation of the controller layer from the domain layer
 * - The `Uploader` object (domain) consumes the readable stream returned by busboy (controller)
 * - See https://github.com/mscdex/busboy?tab=readme-ov-file#special-parser-stream-events
 * - Using a class allows for additional processing (read the total upload size)
 * @see {@link createFileUploader | Upload a file}
 * @see {@link getUploadResult | Get upload results}
 */
export const mUpload: RequestHandler = (...args) => wrapMiddlewareExpress(async(req, res, next) => {
    // initialize domain transaction
    const transaction = createFileUploader();
    // multipart data processing library
    const bb = busboy({headers: req.headers});
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    bb.on(`file`, async(_name, file, info) => {
        try {
            // create domain writable
            const writable = transaction(info.filename, info.mimeType);
            // IMPORTANT : route domain errors back to library
            writable.on(`error`, err => {bb.emit(`error`, err);});
            // send file to domain
            file.pipe(writable);
            // wait for completion
            await once(writable, `close`);
            // initialize domain transaction and return
            res.status(200).send(getUploadResult(writable));
            // eslint compliance
            return undefined;
        } catch (err) {
            // delegate to error handling middleware
            next(err);
            // eslint compliance
            return undefined;
        }
    });
    // process upload
    req.pipe(bb);
    // IMPORTANT : wait for library to actually finish processing before returning
    await once(bb, `close`);
})(...args);