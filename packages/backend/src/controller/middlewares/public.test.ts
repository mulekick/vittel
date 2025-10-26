/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {mFetch, mFallback} from "./public.ts";

// import types
import type {Request as ExpressRequest, Response as ExpressResponse} from "express";
import type {RequestMock, ResponseMock, NextFunctionMock} from "@vittel/types";

describe(`test unprotected resources fetching`, () => {
    // init mock variables (destructuring assigment not possible here ...)
    let mockRequest: RequestMock;
    let mockResponse: ResponseMock;
    let mockNext: NextFunctionMock;

    // setup
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            // mock methods (implement a function for chaining)
            status: jest.fn(() => mockResponse as ExpressResponse),
            send: jest.fn(() => mockResponse as ExpressResponse),
            json: jest.fn(() => mockResponse as ExpressResponse)
        };
        mockNext = jest.fn();
    });

    describe(`main middleware`, () => {
        it(`should return a JSON object with HTTP code 200`, async(): Promise<void> => {
            // call middleware with type assertions
            await mFetch(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.stringMatching(/[0-9a-f]{48}/ui),
                timestamp: expect.any(Number)
            }));
        });
    });

    describe(`fallback middleware`, () => {
        it(`should return a default message with HTTP code 200`, async(): Promise<void> => {
            // call middleware with type assertions
            await mFallback(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith(`resources sitting here will be served to anybody 😁`);
        });
    });

});