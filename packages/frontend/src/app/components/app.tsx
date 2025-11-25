/**
 * React app main component.
 * @module
 * @remarks
 * - Scope : CLIENT / COMPONENTS.
 */

// import modules
import React, {useState, useEffect, useRef} from "react";
import config from "../helpers/env.ts";
import {getStringAsync, getObjectAsync, getPepe} from "../helpers/helpers.ts";
import ResourceFetching from "./resourceFetching.tsx";
import WebTokens from "./webTokens.tsx";
import FileUpload from "./fileUpload.tsx";
import AssetImport from "./assetImport.tsx";
import ModuleBundling from "./moduleBundling.tsx";

// import types
import type {SampleData} from "@vittel/types";

// retrieve environment
const {VITE_SRV_ENTRYPOINT} = config;

/**
 * Main react app component.
 */
const App = (props: Record<string, never>): React.JSX.Element => {
    void props;
    // lift all individual components states here
    // so they are updated in a single effect ..
    const [ content, setContent ] = useState<SampleData>({} as SampleData);
    const [ protectedContent, setProtectedContent ] = useState<string>(``);
    const [ pepe, setPepe ] = useState<string>(``);
    // use a ref to mimic some component's "own" property
    const interval = useRef<number | NodeJS.Timeout>();

    // effect hook will be triggered after the DOM updates
    useEffect((): () => void => {
        // update frequency : 2.5 seconds
        interval.current = setInterval(() => {
            // make synchronous calls and pass the state update functions
            void getObjectAsync(`${ VITE_SRV_ENTRYPOINT }/public/fetch`, setContent);
            void getStringAsync(`${ VITE_SRV_ENTRYPOINT }/protected`, setProtectedContent);
            setPepe(getPepe());
        }, 2.5e3);

        // returned function will execute at component unmount
        return () => {clearInterval(interval.current);};
    // trigger the effect after the first render only by passing empty deps
    }, []);

    // return component
    return (
        <main>
            { /* title */ }
            <span className={ `large` }>{ `Vittel Features` }</span>
            { /* data fetching */ }
            <ResourceFetching content={ content } />
            { /* client-side sessions */ }
            <WebTokens protectedContent={ protectedContent } />
            { /* file uploads */ }
            <FileUpload />
            { /* static assets import */ }
            <AssetImport />
            { /* client side module bindling */ }
            <ModuleBundling pepe={ pepe } />
        </main>
    );
};

export default App;