/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {DomainError} from "@vittel/utils/errors";
import {mThrowError, mEmitError} from "./errors.ts";

// import types
import type {Request as ExpressRequest, Response as ExpressResponse} from "express";
import type {RequestMock, ResponseMock, NextFunctionMock} from "@vittel/types";

describe(`test error handling patterns`, () => {
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
            send: jest.fn(() => mockResponse as ExpressResponse)
        };
        mockNext = jest.fn();
    });

    describe(`sync error throwing middleware`, () => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mThrowError(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalledWith(expect.any(DomainError));
        });
    });

    describe(`async error emitting middleware`, () => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mEmitError(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalledWith(expect.any(DomainError));
        });
    });

});