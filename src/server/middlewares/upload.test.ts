/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/init-declarations */

// import modules
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import type {RequestMock, ResponseMock, NextFunctionMock} from "../../interfaces.ts";

// import middlewares
import mUpload from "./upload.ts";

// import types
import type {Request, Response} from "express";

describe(`test file upload `, () => {
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

    // it is very difficult to mock a POST request containing multipart data
    // thus we can only test the error throwing on an invalid request ...

    describe(`upload middleware`, (): void => {
        it(`should pass error to next()`, async(): Promise<void> => {
            // call middleware with type assertions
            await mUpload(mockRequest as Request, mockResponse as Response, mockNext);
            // actual test
            expect(mockNext).toHaveBeenCalled();
        });
    });
});