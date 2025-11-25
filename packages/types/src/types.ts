/**
 * Shared types and interfaces.
 * @module
 * @showCategories
 * @categoryDescription 1. Builtin types
 * - Types that are transversal to all app layers (controller / domain / data).
 * @categoryDescription 2. Domain types
 * - Types for feature oriented objects from the domain layer.
 * @categoryDescription 3. React types
 * - Types for react component props static typing in the frontend packages.
 * @remarks
 * - Scope : GENERAL.
 * - Types and interfaces used across the entire monorepo.
 * - When using the type-driven development approach, this is the starting point for modifying app features.
 * - IMPORTANT : to avoid runtime issues, only types should be imported here with `import type`.
 */

// import types
import type {z} from "zod";
import type {ServerOptions} from "node:https";
import type {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from "express";
import type {domainErrors} from "./enums.ts";
import type {parsers} from "./parsers.ts";

// ##############################################################
// #                       UTILITY TYPES                        #
// ##############################################################

/**
 * Generic type for functions.
 * @typeParam R Function parameters type tuple.
 * @typeParam T Return value type (can be a promise).
 * @category 1. Builtin types
 * @useDeclaredType
 */
export type TypedFunction<R extends Array<unknown>, T> = (...args: R) => T;

/**
 * Generic type for controller callbacks.
 * @category 1. Builtin types
 * @typeParam R Types of controller objects to bind to the callback.
 * @typeParam T Domain function type expression.
 * @useDeclaredType
 * @remarks
 * - The controller queries the domain by invoking domain functions.
 * - The controller declares callbacks to process requests and responses :
 *   - A controller callback references controller-specific objects (middlewares).
 *   - A controller callback also expects domain-provided results.
 * - The controller then imports and calls the domain function :
 *   - It binds the relevant controller objects to the callback.
 *   - It passes the callback as an argument to the domain function.
 *   - The domain function executes the callback and passes the results to it.
 * - This pattern decouples the controller layer from the domain layer :
 *   - The controller is tightly coupled to the domain (this is normal).
 *   - The domain is **loosely coupled** to any controller object that may call it.
 * - As a result, no controller object needs to be imported in the domain ever.
 * - Each controller creates its own callbacks and pass it to the domain the same way.
 * - See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 * - See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).
 */
export type ControllerCallback<R extends Array<unknown>, T> = T extends TypedFunction<infer Z, infer X> ? TypedFunction<[...R, ...Z], X> : never;

/**
 * Generic type for data accessors.
 * @category 1. Builtin types
 * @typeParam R Types of data layer objects that bind to the accessor.
 * @typeParam T Domain function type expression.
 * @useDeclaredType
 * @remarks
 * - The domain queries the data layer by invoking data accessors.
 * - The data layer exposes its API by exporting accessor functions :
 *   - An accessor function is bound to data-specific objects (db clients).
 *   - An accessor function also returns domain-expected results.
 * - The domain then imports and calls the accessor function :
 *   - It only needs to pass domain-specific values to the accessor as arguments.
 *   - The accessor then executes and returns the domain-expected results.
 * - This pattern decouples the domain layer from the data layer :
 *   - The data layer is tightly coupled to the domain (this is normal).
 *   - The domain is **loosely coupled** to any accessor that it may call.
 * - As a result, no data layer object needs to be imported in the domain ever.
 * - Each data layer creates its own accessors and exports it the same way.
 * - See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 * - See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).
 */
export type DataAccessor<R extends Array<unknown>, T> = T extends TypedFunction<infer Z, infer X> ? Z extends [...R, ...infer Y] ? TypedFunction<Y, X> : never : never;

// ##############################################################
// #                         ERROR TYPES                        #
// ##############################################################

/**
 * Domain transaction error object type.
 * @category 1. Builtin types
 * @interface
 * @property type - Domain error that occured during the transaction.
 * @property payload - Payload associated with the error, unrelated to the original transaction payload.
 */
export interface TransactionError {
    type: domainErrors;
    payload: unknown;
};

/**
 * Unhandled promise rejection error object type.
 * @category 1. Builtin types
 * @interface
 * @property id - Correlation id for the async call chains where the promise rejected.
 * @remarks
 * - Restores the original stack of the error the promise rejected with.
 * - Used only in the server unhandled rejections handler.
 */
export interface AsyncError {
    id: string;
};

// ##############################################################
// #                         JEST TYPES                         #
// ##############################################################

/**
 * Jest mock function for express request.
 * @category 1. Builtin types
 * @useDeclaredType
 * @remarks
 * - Used to write jest unit tests for express middlewares.
 */
export type RequestMock = Partial<ExpressRequest>;

/**
 * Jest mock function for express response.
 * @category 1. Builtin types
 * @useDeclaredType
 * @remarks
 * - Used to write jest unit tests for express middlewares.
 */
export type ResponseMock = Partial<ExpressResponse>;

/**
 * Jest mock function for express next function.
 * @category 1. Builtin types
 * @useDeclaredType
 * @remarks
 * - Used to write jest unit tests for express middlewares.
 */
export type NextFunctionMock = NextFunction;

// ##############################################################
// #                       CONFIG TYPES                         #
// ##############################################################

/**
 * Configuration type for the backend server.
 * @category 1. Builtin types
 * @interface
 * @property dirName - Server process working directory
 * @property VITE_SRV_ENTRYPOINT - Server API root route
 * @property APP_HOST - Express server host
 * @property APP_PORT - Express server port
 * @property APP_ENABLE_HTTPS - HTTPS enabled / disabled
 * @property APP_SERVE_BUNDLE - Server serves react app bundle at /
 * @property APP_BUNDLE_DIR - React app bundle directory
 * @property APP_MAX_UPLOAD_SIZE - Max size allowed for uploads
 * @property APP_KEYPAIR_ALG - The key pair algorithm.
 * @property APP_COOKIE_NAME - Cookie holding the JWT
 * @property APP_TOKEN_VALIDITY - JWT validity duration in seconds
 * @property APP_TLS_OPTIONS - Server TLS configuration options
 * @remarks
 * - Common to development and production mode.
 */
export interface BackendConfigSignature {
    dirName: string;
    VITE_SRV_ENTRYPOINT: string;
    APP_HOST: string;
    APP_PORT: number;
    APP_ENABLE_HTTPS: boolean;
    APP_SERVE_BUNDLE: boolean;
    APP_BUNDLE_DIR: string;
    APP_MAX_UPLOAD_SIZE: number;
    APP_KEYPAIR_ALG: string;
    APP_COOKIE_NAME: string;
    APP_TOKEN_VALIDITY: number;
    APP_TLS_OPTIONS: ServerOptions;
}

/**
 * Configuration type for the react client app.
 * @category 1. Builtin types
 * @interface
 * @property BASE_URL - ???
 * @property MODE - Run the app in development or production mode
 * @property VITE_HOST - Vite server host
 * @property VITE_PORT - Vite server port
 * @property VITE_SRV_ENTRYPOINT - Server API root route
 */
export interface FrontendConfigSignature {
    BASE_URL: string;
    MODE: string;
    VITE_HOST: string;
    VITE_PORT: number;
    VITE_SRV_ENTRYPOINT: string;
}

// ##############################################################
// #                      SERVER API TYPES                      #
// ##############################################################

/**
 * Mock message objects.
 * @category 2. Domain types
 * @useDeclaredType
 */
export type SampleMessage = z.infer<typeof parsers.SampleMessage>;

/**
 * Sample data objects.
 * @category 2. Domain types
 * @useDeclaredType
 */
export type SampleData = z.infer<typeof parsers.SampleData>;

// ##############################################################
// #                         REACT TYPES                        #
// ##############################################################

/**
 * "Resource fetching" component props type.
 * @category 3. React types
 * @interface
 */
export interface ResourceFetchingProps {
    content: SampleData;
}

/**
 * "Web tokens" component props type.
 * @category 3. React types
 * @interface
 */
export interface WebTokensProps {
    protectedContent: string;
}

/**
 * "Module bundling" component props type.
 * @category 3. React types
 * @interface
 */
export interface ModuleBundlingProps {
    pepe: string;
}