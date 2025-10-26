/**
 * Database access features.
 * @module
 * @remarks
 * - Scope : DATA.
 * - Implements vendor specific database access features.
 * - Returns results to the domain layer for validation and parsing.
 */

// import primitives
import {createHash} from "node:crypto";

/**
 * Async: emulates database read (public)
 */
export const getRandomDataAsync = (): Promise<string> => Promise.resolve(createHash(`sha256`)
    .update(String(new Date().getTime()))
    .digest(`hex`)
    .substring(0, 48));

/**
 * Sync: emulates database read (public)
 */
export const getPublicDataSync = (): string => `resources sitting here will be served to anybody 😁`;

/**
 * Sync: emulates database read (protected)
 */
export const getProtectedDataSync = (): string => `you now have access to protected resources 😎`;