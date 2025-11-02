/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {mProcessMessage} from "./subscriber.ts";
import {domainEvents} from "@vittel/types/enums";

// import types
import {FakeMessageQueue, setRequestLocalsFakeMessageQueue, wrapMiddlewareFakeMessageQueue} from "@vittel/utils";

// write tests
describe(`test message processing middleware`, (): void => {
    // init mock variables
    let mockMessageQueue: Partial<FakeMessageQueue>;

    // setup
    beforeEach(() => {
        mockMessageQueue = {
            // mock methods
            send: jest.fn()
        };
    });

    describe(`when receiving a request for processing data`, () => {
        it(`should send a response message on the [processing] channel`, async(): Promise<void> => {
            // call middleware with type assertions
            const next = wrapMiddlewareFakeMessageQueue(mProcessMessage);
            await setRequestLocalsFakeMessageQueue(next, mockMessageQueue as FakeMessageQueue, {
                event: domainEvents.EVT_PROCESS_DATA,
                data: `Test data processing event`
            });
            // actual test
            expect(mockMessageQueue.send).toHaveBeenCalledWith(`[processing]`, expect.objectContaining({
                event: domainEvents.EVT_DATA_PROCESSED,
                payload: `event data processed: Test data processing event`
            }));
        }, 10e3);
    });

    describe(`when receiving a request for persisting data`, () => {
        it(`should send a response message on the [storage] channel`, async(): Promise<void> => {
            // call middleware with type assertions
            const next = wrapMiddlewareFakeMessageQueue(mProcessMessage);
            await setRequestLocalsFakeMessageQueue(next, mockMessageQueue as FakeMessageQueue, {
                event: domainEvents.EVT_PERSIST_DATA,
                data: 12346579
            });
            // actual test
            expect(mockMessageQueue.send).toHaveBeenCalledWith(`[storage]`, expect.objectContaining({
                event: domainEvents.EVT_DATA_PERSISTED,
                payload: `event data persisted: 12346579`
            }));
        }, 10e3);
    });
});