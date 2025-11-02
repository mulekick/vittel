/**
 * Feature-specific message queue subscriber.
 * @module
 * @remarks
 * - Scope : CONTROLLER / MIDDLEWARES.
 * - Uses a node.js interval to emulate messages arriving on a message queue.
 * - Passing callback functions to the domain enforces strict isolation from the controller.
 * - Use bind to create callbacks and pass the mocked message queue as first argument.
 */

// import modules
import {logger, correlationId, FakeMessageQueue, setRequestLocalsFakeMessageQueue, wrapMiddlewareFakeMessageQueue} from "@vittel/utils";
import {processFakeEvent} from "../../domain/transactions/messages.ts";

// import types
import type {DomainCallback} from "@vittel/types";
import type {MessageHandler} from "@vittel/utils";
import type {dataProcessedCallback, dataPersistedCallback} from "../../domain/transactions/messages.ts";

/**
 * Sync: send a message on specific "users" channel
 * The function will bind the the actual message queue at runtime.
 */
const cbDataProcessed: DomainCallback<[FakeMessageQueue], dataProcessedCallback> = (mq, message) => {
    mq.send(`[processing]`, message);
};

/**
 * Sync: send a message on specific "storage" channel
 * The function will bind the the actual message queue at runtime.
 */
const cbDataPersisted: DomainCallback<[FakeMessageQueue], dataPersistedCallback> = (mq, message) => {
    mq.send(`[storage]`, message);
};

/**
 * Sync message processing middleware
 * @see {@link processFakeEvent | Process incoming messages}
 */
export const mProcessMessage: MessageHandler = async(queue, message) => {
    logger.info({id: correlationId()}, `[message queue] received message ${ JSON.stringify(message) }`);
    // create event callbacks and bind to the queue
    const onProcessed = cbDataProcessed.bind(null, queue);
    const onPersisted = cbDataPersisted.bind(null, queue);
    // initialize domain transaction
    await processFakeEvent(message, onProcessed, onPersisted);
};

/**
 * Subscribe to the queue (attach middleware to incoming messages listener)
 */
const fakeMQ = new FakeMessageQueue().on(FakeMessageQueue.MESSAGE, msg => {
    // create async middleware function and trigger the call chain
    const next = wrapMiddlewareFakeMessageQueue(mProcessMessage);
    void setRequestLocalsFakeMessageQueue(next, fakeMQ, msg);
});

/**
 * Simulate incoming messages
 */
export const subscribe = (): void => {
    setInterval(() => {fakeMQ.emit(FakeMessageQueue.MESSAGE, FakeMessageQueue.createMessage());}, 2.5e3);
};