/**
 * Database access features.
 * @module
 * @remarks
 * - Scope : DATA.
 * - Implements vendor specific database access features.
 * - Imports shared data access features, binds to specific db client.
 * - Returns results to the domain for validation and parsing.
 * - TODO : import a wrapper class for db client, pass client instance to the contructor :
 *   1. Client is instantiated in backend package data layer (npm packages do not include configs)
 *   2. Data accessors are implemented as methods of the wrapper class, `DataAccessor` type may become superfluous.
 */

// import modules
import {createDbClient, getProtectedData, getPublicData, getRandomData, getWritableStreamToFile} from "@vittel/utils";

// import types
import type {DataAccessor} from "@vittel/types";
import type {FakeDatabaseClient} from "@vittel/utils/mocks";

/**
 * Create database client
 * @remarks
 * - Config for the db client is package-specific so it has to be created here.
 * - A `ready` callback will be added in the server main file.
 */
export const dbClient: FakeDatabaseClient = createDbClient({});

/**
 * Bind imports to db client
 */
export const randomData: DataAccessor<[FakeDatabaseClient], typeof getRandomData> = getRandomData.bind(undefined, dbClient);

/**
 * Bind imports to db client
 */
export const publicData: DataAccessor<[FakeDatabaseClient], typeof getPublicData> = getPublicData.bind(undefined, dbClient);

/**
 * Bind imports to db client
 */
export const protectedData: DataAccessor<[FakeDatabaseClient], typeof getProtectedData> = getProtectedData.bind(undefined, dbClient);

/**
 * Bind imports to db client
 */
export const writableStreamToFile: DataAccessor<[FakeDatabaseClient], typeof getWritableStreamToFile> = getWritableStreamToFile.bind(undefined, dbClient);