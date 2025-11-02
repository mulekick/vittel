/**
 * Features that involve handling and routing of errors.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain features that demonstrate possible error handling patterns.
 * - Errors can be thrown in sync or async calls or emitted as `error` events.
 * - In both cases, they will be routed to the general event handler for the app.
 * @see {@link handleError | General error handler}
 */

// import primitives
import {EventEmitter} from "node:events";

// import modules
import {z} from "zod";
import {DomainError, domainErrors} from "@vittel/utils/errors";

// import parsers
import {parsers} from "@vittel/types/parsers";

/**
 * Template clas for event-driven domain processing.
 * @class
 * @remarks
 * - This class is a template for how to handle processing and error routing in event-driven features.
 * - This class creates objects that emit `error` events which are routed in the same fashion as other errors.
 */
export class EventDrivenObject extends EventEmitter {

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
     * Async: throws a domain error during processing, used for error handling patterns benchmarking.
     * @public
     */
    private async startProcessing() {
        try {
            await new Promise(r => {setTimeout(r, 1e3);});
            throw new DomainError(`emitter errored during processing.`, domainErrors.GENERIC_DOMAIN_ERROR, null);
            // resolve instead of erroring
            // this.emit(DomainEventEmitter.DONE, `processing complete.`);
        } catch (error: unknown) {
            this.emit(EventDrivenObject.ERROR, error instanceof Error ? error : new Error(`unknown error`));
        }
    }

    /**
     * Sync: returns a promise that will resolve with the result of some event driven processing.
     */
    process(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.on(EventDrivenObject.DONE, (result: string) => {resolve(result);});
            this.on(EventDrivenObject.ERROR, (error: Error) => {reject(error);});
            void this.startProcessing();
        });
    }
}

/**
 * Sync: throw error, route to error handler
 */
export const throwError = (): string => {
    throw new DomainError(`something errored in the domain`, domainErrors.GENERIC_DOMAIN_ERROR, null);
};

/**
 * Async: emit error, route to error handler
 * - Domain transaction initializes an event emitter instance
 * - Transaction will be fulfilled once a specific event is emitted
 */
export const emitError = (): Promise<string> => parsers.PromiseOf(z.string()).parse(new EventDrivenObject().process());