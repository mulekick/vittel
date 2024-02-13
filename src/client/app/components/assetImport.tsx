// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// vite supports importing any asset as an url - in this case it is mandatory
// to use a named import and access the asset programatically for it to be included
// in the build (eg. set the img src attribute programatically) ...

// @ts-expect-error vite static asset import ...
import viteLogo from "../../img/vite.svg";

const
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    AssetImport = (props:Record<string, never>):React.JSX.Element => <article>
        {/* assets import */}
        <span className="small highlight">
            <FontAwesomeIcon icon={faSquareCheck} /> Static assets imports as urls:
        </span>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
    </article>;

export default AssetImport;