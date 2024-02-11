// import modules
import React, {useState, useEffect, useRef} from "react";
import ResourceFetching from "./resourceFetching.tsx";
import WebTokens from "./webTokens.tsx";
import FileUpload from "./fileUpload.tsx";
import AssetImport from "./assetImport.tsx";
import ModuleBundling from "./moduleBundling.tsx";

// import helpers
import {getContentAsync, getPepe} from "../helpers/helpers.ts";

// retrieve environment
import {VITE_SRV_ENTRYPOINT} from "../helpers/env.ts";

const
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    App = (props:Record<string, never>):React.JSX.Element => {
        const
            // lift all individual components states here
            // so they are updated in a single effect ..
            [ content, setContent ] = useState<string>(``),
            [ protectedContent, setProtectedContent ] = useState<string>(``),
            [ pepe, setPepe ] = useState<string>(``),
            // use a ref to mimic some component's "own" property
            interval = useRef<number | NodeJS.Timeout>();

        // effect hook will be triggered after the DOM updates
        useEffect(():() => void => {
            // update frequency : 2.5 seconds
            interval.current = setInterval(() => {
                // make synchronous calls and pass the state update functions
                getContentAsync(`${ VITE_SRV_ENTRYPOINT }/public/fetch`, setContent);
                getContentAsync(`${ VITE_SRV_ENTRYPOINT }/protected`, setProtectedContent);
                setPepe(getPepe());
            }, 2.5e3);

            // returned function will execute at component unmount
            return () => clearInterval(interval.current);
        // trigger the effect after the first render only by passing empty deps
        }, []);

        // return component
        return <main>
            {/* title */}
            <span className="large">Veetle Features</span>
            <ResourceFetching content={content}/>
            <WebTokens protectedContent={protectedContent} />
            <FileUpload />
            <AssetImport />
            <ModuleBundling pepe={pepe} />
        </main>;
    };

export default App;