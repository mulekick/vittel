/**
 * Features that involve file upload / streaming of data.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain processing can involve calls to the data layer or not.
 * - Results will be parsed and returned if valid, or and error will be thrown.
 * - Do not import controller layer modules here to remain framework agnostic.
 */

/* eslint-disable n/no-sync */

// import modules
import {z} from "zod";
import {Uploader} from "../classes/uploader.ts";
import {getWritableStreamToFileSync} from "../../data/filesystem.ts";

/**
 * Higher order function type
 * @see {@link Uploader | File uploader class}
 */
type UploaderCreator = (file: string, mime: string)=> Uploader;

/**
 * Use a higher order function to parse the result since `createFileUploader` returns a function
 * @see {@link Uploader | File uploader class}
 */
const UploaderCreatorParser: z.ZodFunction<z.ZodTuple<[z.ZodString, z.ZodString], z.ZodUnknown>, z.ZodType<Uploader>> = z.function().args(z.string(), z.string()).returns(z.instanceof(Uploader));

/**
 * Sync: call to data layer
 * - Returns the uploader object creation function
 * @see {@link getWritableStreamToFileSync | Get writable stream to file}
 * @see {@link TransactionUploadParser | Constraints for parsing class instances}
 */
export const createFileUploader = (): UploaderCreator => UploaderCreatorParser.parse((file: string, mime: string) => {
    // create passthrough duplex stream
    const u = new Uploader({
        // encode incoming strings
        decodeStrings: true,
        // pass buffers to readable
        encoding: undefined,
        // disable object mode
        objectMode: false,
        // stream closing behavior
        emitClose: true,
        autoDestroy: true
    }, file, mime);
    // pipe to data layer, discard file to /dev/null
    u.pipe(getWritableStreamToFileSync(`/dev/null`));
    // return
    return u;
});

/**
 * Sync: read uploader object properties
 */
export const getUploadResult = (upload: Uploader): string => {
    const payload = `uploaded '${ upload.filename }' (${ upload.mime }), ${ String(upload.totalBytesRead) } bytes`;
    return z.string().parse(payload);
};