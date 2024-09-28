// import primitives
import {ServerOptions} from "node:https";

// import modules
// eslint-disable-next-line @typescript-eslint/no-shadow
import {Request, Response, NextFunction} from "express";

// react app interfaces - use a single signature for all components
export interface TextContentPropsSignature {
    content?: string;
    protectedContent?: string;
    pepe?: string;
}

// server interfaces
export interface ConfigSignature {
    dirName: string;
    VITE_SRV_ENTRYPOINT: string;
    APP_HOST: string;
    APP_PORT: number;
    APP_ENABLE_HTTPS: boolean;
    APP_BUILD_DIR: string;
    APP_UPLOAD_DIR: string;
    APP_MAX_UPLOAD_SIZE: number;
    APP_KEYPAIR_ALG: string;
    APP_COOKIE_NAME: string;
    APP_TOKEN_VALIDITY: number;
    APP_TLS_OPTIONS: ServerOptions;
}

// test interfaces
export type RequestMock = Partial<Request>;
export type ResponseMock = Partial<Response>;
export type NextFunctionMock = NextFunction;