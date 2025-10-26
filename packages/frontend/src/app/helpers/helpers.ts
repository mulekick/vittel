/**
 * Feature-agnostic client side helpers.
 * @module
 * @remarks
 * - Scope : CLIENT / HELPERS.
 */

// import modules
import React from "react";
// vite supports client-side npm modules bundling ...
import pepe from "@mulekick/pepe-ascii";
import {rnd} from "@vittel/utils/common";

// import types
import type {SampleData} from "@vittel/types";

/**
 * Async helper for GET requests to the server API.
 */
export const getStringAsync = async(route: string, hydrate: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
    try {
        // get data
        const readable = await fetch(route, {method: `GET`});
        // transaction failed
        if (!readable.ok)
            throw new Error(await readable.text());
        // server-side parsing provides safe inference to API type
        const payload = await readable.text();
        // update state and render
        hydrate(payload || ``);
    } catch (e: unknown) {
        // render the error
        hydrate(e instanceof Error ? e.message : `unexpected error occured`);
    }
};

/**
 * Async helper for GET requests to the server API.
 */
export const getObjectAsync = async(route: string, hydrate: React.Dispatch<React.SetStateAction<SampleData>>): Promise<void> => {
    try {
        // get data
        const readable = await fetch(route, {method: `GET`});
        // transaction failed
        if (!readable.ok)
            throw new Error(await readable.text());
        // no content type header
        if (!readable.headers.get(`content-type`)?.includes(`application/json`))
            throw new Error(`wrong or missing content-type header`);
        // server-side parsing provides safe inference to API type
        const payload = await readable.json() as SampleData;
        // update state and render
        hydrate(payload);
    } catch (e: unknown) {
        // render the error
        hydrate({data: e instanceof Error ? e.message : `unexpected error occured`, timestamp: new Date().getTime()});
    }
};

/**
 * Async helper for POST requests to the server API.
 */
export const postFileAsync = async(route: string, hydrate: React.Dispatch<React.SetStateAction<string>>, body: FormData): Promise<void> => {
    try {
        // post form data
        const readable = await fetch(route, {method: `POST`, body});
        // transaction failed
        if (!readable.ok)
            throw new Error(await readable.text());
        // server-side parsing provides safe inference to API type
        const payload = await readable.text();
        // update state and render
        hydrate(payload || ``);
    } catch (e: unknown) {
        // fetch can fail with ERR_CONNECTION_ABORTED or the server can
        // reply with HTTP 500, so let's render a consistent error
        hydrate(`upload failed (not authenticated / file too large)`);
        // discard original error
        void e;
    }
};

/**
 * Helper for client-side bundled module.
 */
export const getPepe = (): string => {
    // all pepes
    const pepes = Array.from(Object.values(pepe));
    // return a random pepe (typescript situation)
    return pepes.at(rnd(0, pepes.length - 1)) as unknown as string;
};