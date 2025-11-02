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
 * Async: process incoming data
 */
const processDataSomehow = (data: string): Promise<string> => Promise.resolve(`event data processed: ${ data }`);

/**
 * Async: persist incoming data
 */
const persistDataSomehow = (data: number): Promise<string> => Promise.resolve(`event data persisted: ${ String(data) }`);

/**
 * User processed event callback function type
 * - Exported so the controller objects can bind to it.
 */
export type dataProcessedCallback = (message: unknown)=> void;

/**
 * User processed event callback function type
 * - Exported so the controller objects can bind to it.
 */
export type dataPersistedCallback = (message: unknown)=> void;

/**
 * Async: process incoming messages
 * - The domain parses and processes the contents of incoming messages.
 * - It then passes results to a callback specific to the type of event received.
 * - Thus, domain-specific events need **not** to be imported in the controller.
 */
export const processFakeEvent = async(message: unknown, onProcessed: dataProcessedCallback, onPersisted: dataPersistedCallback): Promise<void> => {
    // parse incoming message
    const {event, data} = parsers.FakeMessage.parse(message);
    // mock processing time and execute callbacks ...
    switch (event) {
    case domainEvents.EVT_PROCESS_DATA :
        // await new Promise(r => {setTimeout(r, rnd(1, 5) * 1e3);});
        onProcessed({
            event: domainEvents.EVT_DATA_PROCESSED,
            payload: await processDataSomehow(z.string().parse(data))
        });
        break;
    case domainEvents.EVT_PERSIST_DATA :
        // await new Promise(r => {setTimeout(r, rnd(1, 5) * 1e3);});
        onPersisted({
            event: domainEvents.EVT_DATA_PERSISTED,
            payload: await persistDataSomehow(z.number().parse(data))
        });
        break;
    default :
        throw new DomainError(`invalid event received: ${ event }`, domainErrors.GENERIC_DOMAIN_ERROR, {});
    }
};