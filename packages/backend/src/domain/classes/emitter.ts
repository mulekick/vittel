/**
 * Event emitter based class for demonstration.
 * @module
 * @remarks
 * - Scope : DOMAIN / CLASSES.
 * - This class is used to demonstrate error routing capabilities at the app level.
 * - This class creates objects that emit `error` events which are routed in the same fashion as other errors.
 */

// import primitives
import {EventEmitter} from "node:events";

// import modules
import {DomainError, domainErrors} from "@vittel/utils/errors";

/**
 * Use an event emitter to handle domain transaction
 * @class
 */
export class DomainEventEmitter extends EventEmitter {

    /**
     * Emitted when processing encounters an error.
     * @eventProperty
     */
    static readonly ERROR = `error`;

    /**
     * Emitted once processing is done.
     * @eventProperty
     */
    static readonly DONE = `done`;

    /**
     * Async: throws a domain error during processing, used for error handling patterns benchmarking purposes.
     * @public
     */
    private async startProcessing() {
        try {
            await new Promise(r => {setTimeout(r, 1e3);});
            throw new DomainError(`emitter errored during processing.`, domainErrors.GENERIC_DOMAIN_ERROR, null);
            // resolve instead of erroring
            // this.emit(DomainEventEmitter.DONE, `processing complete.`);
        } catch (error: unknown) {
            this.emit(DomainEventEmitter.ERROR, error instanceof Error ? error : new Error(`unknown error`));
        }
    }

    /**
     * Sync: returns a promise that will resolve with the result of some event driven processing.
     */
    process(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.on(DomainEventEmitter.DONE, (result: string) => {resolve(result);});
            this.on(DomainEventEmitter.ERROR, (error: Error) => {reject(error);});
            void this.startProcessing();
        });
    }
}