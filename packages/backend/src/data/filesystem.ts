/**
 * File system access features.
 * @module
 * @remarks
 * - Scope : DATA.
 * - Implements vendor specific file system access features.
 * - Returns results to the domain layer for validation and parsing.
 */

/* eslint-disable security/detect-non-literal-fs-filename */

// import primitives
import {createWriteStream} from "node:fs";

// import types
import type {WriteStream} from "node:fs";

/**
 * Sync: creates a writable stream to a file system path
 */
export const getWritableStreamToFileSync = (path: string): WriteStream => createWriteStream(path);