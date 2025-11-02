/**
 * File system access features.
 * @module
 * @remarks
 * - Scope : DATA.
 * - Implements vendor specific file system access features.
 * - Returns results to the domain layer for validation and parsing.
 */

// import primitives
import {createWriteStream} from "node:fs";

// import types
import type {WriteStream} from "node:fs";

/**
 * Sync: creates a writable stream to a file system path (demonstration: discard file to /dev/null)
 */
export const getWritableStreamToFile = (): WriteStream => createWriteStream(`/dev/null`);