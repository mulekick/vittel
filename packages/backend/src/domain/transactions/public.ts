/**
 * Features that involve public data.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain processing can involve calls to the data layer or not.
 * - Results will be parsed and returned if valid, or and error will be thrown.
 * - Do not import controller layer modules here to remain framework agnostic.
 */

// import modules
import {z} from "zod";
import {randomData, publicData} from "../../data/database.ts";

// import parsers
import {parsers} from "@vittel/types/parsers";

// imort types
import type {SampleData} from "@vittel/types";

/**
 * Async: call to data layer (public)
 * @see {@link getRandomData | Data layer call}
 */
export const getData = async(): Promise<SampleData> => {
    const result = {
        data: await randomData(),
        timestamp: new Date().getTime()
    };
    return parsers.SampleData.parse(result);
};

/**
 * Sync: call to data layer (public)
 * @see {@link getPublicData | Data layer call}
 */
export const getFallback = (): string => z.string().parse(publicData());