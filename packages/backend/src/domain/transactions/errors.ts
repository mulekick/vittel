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

// import modules
import {z} from "zod";
import {DomainError, domainErrors} from "@vittel/utils/errors";
import {DomainEventEmitter} from "../classes/emitter.ts";

// import parsers
import {parsers} from "@vittel/types/parsers";

/**
 * Sync: throw error, route to error handler
 */
export const throwErrorSync = (): string => {
    throw new DomainError(`something errored in the domain`, domainErrors.GENERIC_DOMAIN_ERROR, null);
};

/**
 * Async: emit error, route to error handler
 * - Domain transaction initializes an event emitter instance
 * - Transaction will be fulfilled once a specific event is emitted
 * @see {@link DomainEventEmitter | Error emitting object class}
 */
export const emitErrorAsync = (): Promise<string> => parsers.PromiseOf(z.string()).parse(new DomainEventEmitter().process());