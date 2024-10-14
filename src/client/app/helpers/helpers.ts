// import modules
import React from "react";
// vite supports client-side npm modules bundling ...
import pepe from "@mulekick/pepe-ascii";

const
    getAsync = async(route: string, hydrate: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
        try {
            // post form data
            const readable = await fetch(route, {method: `GET`});
            // parse response stream into a string, update state, render
            hydrate(await readable.text());
        } catch (e: unknown) {
            // render the error
            hydrate(e instanceof TypeError ? e.message : `unexpected error occured`);
        }
    },
    postAsync = async(route: string, hydrate: React.Dispatch<React.SetStateAction<string>>, body: FormData): Promise<void> => {
        try {
            // post form data
            const readable = await fetch(route, {method: `POST`, body});
            // upload failed (HTTP 500)
            if (!readable.ok)
                throw new Error();
            // parse response stream into a string, update state, render
            hydrate(await readable.text());
        } catch (e: unknown) {
            // fetch can fail with ERR_CONNECTION_ABORTED or the server can
            // reply with HTTP 500, so let's render a consistent error
            hydrate(`upload failed 😬`);
            // discard original error
            void e;
        }
    },
    // random number between 2 values
    rnd = (lb: number, ub: number): number => lb + Math.round(Math.random() * (ub - lb)),
    // use an npm module client side
    getPepe = (): string => {
        // all pepes
        const pepes = Array.from(Object.values(pepe));
        // return a random pepe (typescript situation)
        return pepes.at(rnd(0, pepes.length - 1)) as unknown as string;
    };

export {getAsync, postAsync, getPepe};