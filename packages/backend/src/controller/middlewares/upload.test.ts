/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import {mUpload} from "./upload.ts";

// import types
import type {Request as ExpressRequest, Response as ExpressResponse} from "express";
import type {RequestMock, ResponseMock, NextFunctionMock} from "@vittel/types";

describe(`test file upload `, () => {
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
            cookie: jest.fn(() => mockResponse as ExpressResponse),
            send: jest.fn(() => mockResponse as ExpressResponse),
            end: jest.fn(() => mockResponse as ExpressResponse)
        };
        mockNext = jest.fn();
    });

    // it is very difficult to mock a POST request containing multipart data
    // thus we can only test the error throwing on an invalid request ...

    describe(`upload middleware`, (): void => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mUpload(mockRequest as ExpressRequest, mockResponse as ExpressResponse, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});