/**
 * Domain feature that involve message-related processing.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain processing can involve calls to the data layer or not.
 * - Results will be parsed and returned if valid, or and error will be thrown.
 * - Do not import controller layer modules here to remain framework agnostic.
 */

// import modules
import {z} from "zod";
import {domainErrors, domainEvents} from "@vittel/types/enums";
import {parsers} from "@vittel/types/parsers";
import {rnd} from "@vittel/utils/common";
import {DomainError} from "@vittel/utils/errors";

/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/no-unsafe-enum-comparison */

/**
 * Process incoming data
 */
const processDataSomehow = (data: string): Promise<string> => new Promise(r => {
    setTimeout(() => {r(`event data processed: ${ data }`);}, rnd(1, 5) * 1e3);
});

/**
 * Async: persist incoming data
 */
const persistDataSomehow = (data: number): Promise<string> => new Promise(r => {
    setTimeout(() => {r(`event data persisted: ${ String(data) }`);}, rnd(1, 5) * 1e3);
});

/**
 * Expose "data processed" function type to the controller
 */
export type onDataProcessed = (message: unknown) => void;

/**
 * Expose "data persisted" function type to the controller
 */
export type onDataPersisted = (message: unknown) => void;

/**
 * Async: process incoming messages
 * - The domain parses and processes the contents of incoming messages.
 * - It then passes results to a callback specific to the type of event received.
 * - Thus, domain-specific events need **not** to be imported in the controller.
 */
export const processFakeEvent = async(message: unknown, onProcessed: onDataProcessed, onPersisted: onDataPersisted): Promise<void> => {
    // parse incoming message
    const {event, data} = parsers.SampleMessage.parse(message);
    // mock processing time and execute callbacks ...
    switch (event) {
    case domainEvents.EVT_PROCESS_DATA :
        onProcessed({
            event: domainEvents.EVT_DATA_PROCESSED,
            payload: await processDataSomehow(z.string().parse(data))
        });
        break;
    case domainEvents.EVT_PERSIST_DATA :
        onPersisted({
            event: domainEvents.EVT_DATA_PERSISTED,
            payload: await persistDataSomehow(z.number().parse(data))
        });
        break;
    default :
        throw new DomainError(`invalid event received: ${ event }`, domainErrors.GENERIC_DOMAIN_ERROR, {});
    }
};