/**
 * @jest-environment node
 */

/* eslint-disable init-declarations, no-shadow */

// import modules
import {Request, Response, NextFunction} from "express";
import {jest, describe, beforeEach, it, expect} from "@jest/globals";
import type {RequestMock, ResponseMock, NextFunctionMock} from "../interfaces.ts";

import mError from "./error.ts";

describe(`test error throwing middleware`, () => {
    let
        // init mock variables (destructuring assigment not possible here ...)
        mockRequest: RequestMock,
        mockResponse: ResponseMock,
        mockNext: NextFunctionMock;

    // setup
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockNext = jest.fn();
    });

    // test against the error message
    it(`should throw an error`, ():void => {
        // calls to error throwing functions need to be wrapped
        // in another function or the toThrow() matcher will fail

        // call middleware with type assertions
        expect(() => mError(mockRequest as Request, mockResponse as Response, mockNext as NextFunction)).toThrow(`some asshole purposely threw an error 😡`);
    });
});