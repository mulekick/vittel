/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {domainEvents} from "@vittel/types/enums";
import {setRequestLocalsFakeMessageQueue, wrapMiddlewareFakeMessageQueue} from "@vittel/utils";
import {mProcessMessage} from "./subscriber.ts";

// import types
import type {FakeMessageQueueClient} from "@vittel/utils/mocks";

// write tests
describe(`test message processing middleware`, (): void => {
    // init mock variables
    let mockMessageQueue: Partial<FakeMessageQueueClient>;

    // setup
    beforeEach(() => {
        mockMessageQueue = {
            // mock methods
            send: jest.fn()
        };
    });

    describe(`when receiving a request for processing data`, () => {
        it(`should send a response message on the [processing] channel`, (): Promise<void> => {
            // call middleware with type assertions
            const next = wrapMiddlewareFakeMessageQueue(mProcessMessage);
            // add async local storage support
            setRequestLocalsFakeMessageQueue(next, mockMessageQueue as FakeMessageQueueClient, {
                event: domainEvents.EVT_PROCESS_DATA,
                data: `Test data processing event`
            });
            // wait for the processing to end, return promise
            return new Promise(r => {setTimeout(r, 5e3);}).then(() => {
                // actual test
                expect(mockMessageQueue.send).toHaveBeenCalledWith(`[processing]`, expect.objectContaining({
                    event: domainEvents.EVT_DATA_PROCESSED,
                    payload: `event data processed: Test data processing event`
                }));
            });
        }, 10e3);
    });

    describe(`when receiving a request for persisting dat`, () => {
        it(`should send a response message on the [storage] channel`, (): Promise<void> => {
            // call middleware with type assertions
            const next = wrapMiddlewareFakeMessageQueue(mProcessMessage);
            // add async local storage support
            setRequestLocalsFakeMessageQueue(next, mockMessageQueue as FakeMessageQueueClient, {
                event: domainEvents.EVT_PERSIST_DATA,
                data: 12346579
            });
            // wait for the processing to end, return promise
            return new Promise(r => {setTimeout(r, 5e3);}).then(() => {
                // actual test
                expect(mockMessageQueue.send).toHaveBeenCalledWith(`[storage]`, expect.objectContaining({
                    event: domainEvents.EVT_DATA_PERSISTED,
                    payload: `event data persisted: 12346579`
                }));
            });
        }, 10e3);
    });
});