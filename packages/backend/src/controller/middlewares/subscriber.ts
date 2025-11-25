/**
 * Feature-specific message queue subscriber.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Passing callback functions to the domain enforces strict isolation from the controller.
 * - Use bind to create callbacks and pass the mocked message queue as first argument.
 */

// import modules
import {logger, correlationId} from "@vittel/utils";
import {FakeMessageQueueClient} from "@vittel/utils/mocks";
import {processFakeEvent} from "../../domain/transactions/messages.ts";

// import types
import type {ControllerCallback} from "@vittel/types";
import type {MessageHandler} from "@vittel/utils/mocks";
import type {onDataProcessed, onDataPersisted} from "../../domain/transactions/messages.ts";

/**
 * Send a message on specific "users" channel
 */
const cbDataProcessed: ControllerCallback<[FakeMessageQueueClient], onDataProcessed> = (mq, message) => {
    mq.send(`[processing]`, message);
};

/**
 * Send a message on specific "storage" channel
 */
const cbDataPersisted: ControllerCallback<[FakeMessageQueueClient], onDataPersisted> = (mq, message) => {
    mq.send(`[storage]`, message);
};

/**
 * Message processing middleware
 * @see {@link processFakeEvent | Process incoming messages}
 * @remarks
 * - Declare local callback functions and bind to the message queue
 */
export const mProcessMessage: MessageHandler = async(queue, message) => {
    logger.info({id: correlationId()}, `[message queue] received message ${ JSON.stringify(message) }`);
    // create event callbacks and bind to the queue
    const onProcessed = cbDataProcessed.bind(null, queue);
    const onPersisted = cbDataPersisted.bind(null, queue);
    // initialize domain transaction
    await processFakeEvent(message, onProcessed, onPersisted);
};