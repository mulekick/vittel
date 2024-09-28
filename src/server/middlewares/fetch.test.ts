/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/init-declarations */

// import modules
import {Request, Response} from "express";
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import type {RequestMock, ResponseMock, NextFunctionMock} from "../../interfaces.ts";

// import middlewares
import {mFetch, mFallback} from "./fetch.ts";

describe(`test unprotected resources fetching`, () => {
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
            send: jest.fn(() => mockResponse as Response)
        };
        mockNext = jest.fn();
    });

    describe(`main middleware`, () => {
        it(`should return a HTTP 200`, (): void => {
            // call middleware with type assertions
            void mFetch(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
        it(`should return a SHA-256 hash`, (): void => {
            // call middleware with type assertions
            void mFetch(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockResponse.send).toHaveBeenCalled();
        });
    });

    describe(`fallback middleware`, () => {
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
            expect(mockResponse.send).toHaveBeenCalledWith(`resources sitting here will be served to anybody 😁`);
        });
    });

});