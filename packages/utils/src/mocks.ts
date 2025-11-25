/**
 * Mock implementations of client libraries.
 * @module
 * @remarks
 * - Scope : GENERAL
 * - Message queue and database client mocks.
 * - Used to illustrate architecture patterns in the backend module.
 * - This module and relevant exports can be discarded once actual libraries are used.
 */

// import primitives
import EventEmitter from "node:events";
import console from "node:console";
import {createWriteStream} from "node:fs";
import {createHash} from "node:crypto";

// import modules
import {domainEvents} from "@vittel/types/enums";
import {rnd} from "./common.js";
import {correlationId, logger} from "./utils.js";

// import types
import type {SampleMessage} from "@vittel/types";
import type {WriteStream} from "node:fs";

/**
 * Signature for message queue middlewares.
 * @useDeclaredType
 * @remarks
 * - Needs to be updated once a genuine message queue / no message queue at all is used.
 */
export type MessageHandler = (mq: FakeMessageQueueClient, msg: unknown) => Promise<void>;

/**
 * Message queue mock
 * - Uses a node.js interval to emulate messages arriving on a message queue.
 * - Generates messages and mocks the send() method of an actual message queue.
 * - Imported by the controller layer of the backend service so as to subscribe to it.
 * @class
 */
export class FakeMessageQueueClient extends EventEmitter {

    /**
     * Emitted when a new message arrives on the message queue.
     * @eventProperty
     */
    static readonly MESSAGE = `message`;

    /**
     * Mocks "process incoming data" events.
     */
    private static toProcess = [ `Some event`, `Another event`, `One more event` ];

    /**
     * Mocks "persist incoming data" events.
     */
    private static toPersist = [ 1555263, 98766300, 10000065 ];

    /**
     * Creates a fake incoming message.
     */
    static createMessage(): SampleMessage {
        const [ x, y ] = [ rnd(0, 3), rnd(0, 2) ];
        return {
            event: (x ? domainEvents.EVT_PROCESS_DATA : domainEvents.EVT_PERSIST_DATA) as domainEvents,
            // eslint-disable-next-line security/detect-object-injection
            data: x ? FakeMessageQueueClient.toProcess[y] : FakeMessageQueueClient.toPersist[y]
        };
    }

    /**
     * Simulate incoming messages
     */
    subscribe(): void {
        console.log(`subscribed to mock message queue.`);
        setInterval(() => {
            this.emit(FakeMessageQueueClient.MESSAGE, FakeMessageQueueClient.createMessage());
        }, 2.5e3);
    }

    /**
     * Sync: simulates sending a message on the queue.
     */
    send(channel: string, message: unknown): void {
        logger.info({id: correlationId()}, `[message queue] sending event ${ JSON.stringify(message) } on channel ${ channel }`);
        void this;
    }
}

/**
 * Mocks a database client
 * - Generates messages and mocks the send() method of an actual message queue.
 * - Imported by the controller layer of the backend service so as to subscribe to it.
 * - This class can be discarded once a genuine message queue / no message queue at all is used.
 * @class
 */
export class FakeDatabaseClient extends EventEmitter {

    /**
     * Emitted once the client connects to the database.
     * @eventProperty
     */
    static readonly READY = `ready`;

    /**
     * Sync: simulates database connectiob.
     */
    connect(): void {
        setImmediate(() => {
            console.log(`mock database connected.`);
            this.emit(FakeDatabaseClient.READY);
        });
    }

    /**
     * Async: emulates database read (public)
     */
    randomData(): Promise<string> {
        void this;
        return Promise.resolve(createHash(`sha256`)
            .update(String(new Date().getTime()))
            .digest(`hex`)
            .substring(0, 48));
    }

    /**
     * Sync: emulates database read (public)
     */
    publicData(): string {
        void this;
        return `resources sitting here will be served to anybody 😁`;
    }

    /**
     * Sync: emulates database read (protected)
     */
    protectedData(): string {
        void this;
        return `you now have access to protected resources 😎`;
    }

    /**
     * Sync: process streamed data (discard to /dev/null)
     */
    writableStreamToFile(): WriteStream {
        void this;
        return createWriteStream(`/dev/null`);
    }
}