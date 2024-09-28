/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/init-declarations */

// import modules
import {Request, Response} from "express";
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import type {RequestMock, ResponseMock, NextFunctionMock} from "../../interfaces.ts";

// import middlewares
import {mToken, mProtection, mFallback} from "./protected.ts";

describe(`test protected resources fetching`, () => {
    let
        // init mock variables (destructuring assigment not possible here ...)
        mockRequest: RequestMock,
        mockResponse: ResponseMock,
        mockNext: NextFunctionMock;

    // setup
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            // mock methods (implement a function for chaining)
            status: jest.fn(() => mockResponse as Response),
            cookie: jest.fn(() => mockResponse as Response),
            send: jest.fn(() => mockResponse as Response),
            end: jest.fn(() => mockResponse as Response)
        };
        mockNext = jest.fn();
    });

    describe(`token request middleware`, (): void => {
        it(`should return a HTTP 201`, async(): Promise<void> => {
            // call middleware with type assertions
            await mToken(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(201);
        });
        it(`should add set-cookie header to response`, async(): Promise<void> => {
            // call middleware with type assertions
            await mToken(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.cookie).toHaveBeenCalled();
        });
        it(`should end response`, async(): Promise<void> => {
            // call middleware with type assertions
            await mToken(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.end).toHaveBeenCalled();
        });
    });

    describe(`protection middleware (no token)`, (): void => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mProtection(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe(`fallback middleware`, (): void => {
        it(`should return a HTTP 200`, (): void => {
            // call middleware with type assertions
            void mFallback(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
        it(`should return a default message`, (): void => {
            // call middleware with type assertions
            void mFallback(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.send).toHaveBeenCalledWith(`you now have access to protected resources 😎`);
        });
    });
});