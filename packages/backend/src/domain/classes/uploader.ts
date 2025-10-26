/**
 * Duplex stream based file uploading class.
 * @module
 * @remarks
 * - Scope : DOMAIN / CLASSES.
 * - This class is used to demonstrate how to process data streams in addition to objects.
 * - This class exposes a writable stream to the controller layer to receive the uploaded file.
 * - This class exposes a readable stream to the data layer to persist the uploaded file.
 * - Additional processing can be implemented in the stream methods (see below).
 * - Working with streams allows the domain layer to remain framework and database agnostic.
 */

// import primitives
import {Duplex} from "node:stream";
import {Buffer} from "node:buffer";

// import modules
import {DomainError, domainErrors} from "@vittel/utils/errors";
import config from "../../config.ts";

// import types
import type {DuplexOptions} from "node:stream";

/**
 * Destructure config values
 */
const {APP_MAX_UPLOAD_SIZE} = config;

/**
 * Sync: create duplex stream to route uploads to the data layer ...
 * @class
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