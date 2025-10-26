/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {DomainError} from "@vittel/utils/errors";
import {mToken, mProtection, mFallback} from "./protected.ts";

// import types
import type {Request as ExpressRequest, Response as ExpressResponse} from "express";
import type {RequestMock, ResponseMock, NextFunctionMock} from "@vittel/types";

describe(`test protected resources fetching`, () => {
    // init mock variables (destructuring assigment not possible here ...)
    let mockRequest: RequestMock;
    let mockResponse: ResponseMock;
    let mockNext: NextFunctionMock;

    // setup
    beforeEach(() => {
        mockRequest = {
            // mock cookie-parser features
            cookies: {}
        };
        mockResponse = {
            // mock methods (implement a function for chaining)
            status: jest.fn(() => mockResponse as ExpressResponse),
            cookie: jest.fn(() => mockResponse as ExpressResponse),
            send: jest.fn(() => mockResponse as ExpressResponse),
            end: jest.fn(() => mockResponse as ExpressResponse)
        };
        mockNext = jest.fn();
    });

    describe(`token request middleware`, (): void => {
        it(`should add set-cookie header and end response with HTTP code 201`, async(): Promise<void> => {
            // call middleware with type assertions
            await mToken(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockResponse.cookie).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.end).toHaveBeenCalled();
        });
    });

    describe(`protection middleware (no token)`, (): void => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mProtection(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalledWith(expect.any(DomainError));
        });
    });

    describe(`fallback middleware`, (): void => {
        it(`should return a default message with HTTP code 200`, async(): Promise<void> => {
            // call middleware with type assertions
            await mFallback(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith(`you now have access to protected resources 😎`);
        });
    });
});