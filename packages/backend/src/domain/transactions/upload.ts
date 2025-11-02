/**
 * Features that involve file upload / streaming of data.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain processing can involve calls to the data layer or not.
 * - Results will be parsed and returned if valid, or and error will be thrown.
 * - Do not import controller layer modules here to remain framework agnostic.
 */

// import primitives
import {Duplex} from "node:stream";
import {Buffer} from "node:buffer";

// import modules
import {z} from "zod";
import {DomainError, domainErrors} from "@vittel/utils/errors";
import {getWritableStreamToFile} from "../../data/filesystem.ts";
import config from "../../config.ts";

// import types
import type {DuplexOptions} from "node:stream";

/**
 * Destructure config values
 */
const {APP_MAX_UPLOAD_SIZE} = config;

/**
 * Duplex stream based file uploading class.
 * @class
 * @remarks
 * - This class is a template for how to process data streams in addition to objects :
 *   1. It exposes a writable stream to the controller layer to receive the uploaded file.
 *   2. It exposes a readable stream to the data layer to persist the uploaded file.
 * - Additional processing can be implemented in the stream methods (see below).
 * - Working with streams allows the domain layer to remain framework and database agnostic.
 */
export class Uploader extends Duplex {
    // uploaded file name
    public filename: string;
    // uploaded file mime type
    public mime: string;
    // bytes read from writable end
    public totalBytesRead: number;

    constructor(opts: DuplexOptions, filename: string, mime: string) {
        super(opts);
        this.totalBytesRead = 0;
        this.filename = filename;
        this.mime = mime;
    }

    /**
     * Fires when data is available on the writable end, reads data
     * @internal
     */
    public _read(size: number): void {
        void this;
        void size;
    }

    /**
     * Fires when a read happens, pushes read data to the readable end
     * - Additional processing: update the total upload size at each read
     * @internal
     */
    public _write(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null)=> void): void {
        try {
            // enforce max upload size at the domain layer ...
            if (chunk.length > APP_MAX_UPLOAD_SIZE * 1024 || this.totalBytesRead > APP_MAX_UPLOAD_SIZE * 1024)
                throw new DomainError(`max upload size exceeded`, domainErrors.FILE_UPLOAD_FAILED, null);
            // update total
            this.totalBytesRead += chunk.length;
            this.push(chunk);
        } catch (err: unknown) {
            // destroy writable, route error back to controller
            this.destroy(err instanceof Error ? err : new Error(`unknown error`));
        }
        callback();
    }

    /**
     * Fires once reads are exhausted on the writable end
     * @internal
     */
    public _final(callback: (error?: Error | null)=> void): void {
        // signal EOF
        this.push(null);
        callback();
    }
}

/**
 * Sync: call to data layer
 * - Returns the file uploader object
 * @see {@link getWritableStreamToFile | Get writable stream to file}
 */
export const createUploader = (file: string, mime: string): Uploader => {
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
    // pipe to data layer
    u.pipe(getWritableStreamToFile());
    // parse and return
    return z.instanceof(Uploader).parse(u);
};

/**
 * Sync: read uploader object properties
 */
export const getUploadResult = (upload: Uploader): string => z.string().parse(`uploaded '${ upload.filename }' (${ upload.mime }), ${ String(upload.totalBytesRead) } bytes`);