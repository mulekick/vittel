// import modules
import React, {useState, useRef} from "react";

// import helpers
import {requestAsync} from "../helpers/helpers.ts";

// retrieve environment
import {VITE_SRV_ENTRYPOINT} from "../helpers/env.ts";

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    FileUpload = (props:Record<string, never>):React.JSX.Element => {
        const
            // message
            [ lastUploaded, setLastUploaded ] = useState<string>(``),
            // DOM ref to form
            formRef = useRef<HTMLFormElement | null>(null),
            // handler
            onSubmit = (ev:React.FormEvent) => {
                // use form data
                ev.preventDefault();
                // typescript ...
                if (formRef.current === null)
                    return;
                // make synchronous calls and pass the state update functions
                requestAsync(`${ VITE_SRV_ENTRYPOINT }/protected/upload`, setLastUploaded, new FormData(formRef.current));
            };

        return <article>
            {/* file upload */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> File uploads (100 kb max, requires token):
            </span>
            {/* set form action for uploads */}
            <form className="small" ref={ formRef } encType="multipart/form-data" onSubmit={ onSubmit }>
                <p><input type="file" name="afile" data-testid="afile" /></p>
                <input type="submit" value="upload file" />
            </form>
            { lastUploaded ? <span className="small">{ `server: ${ lastUploaded }` }</span> : null }
        </article>;
    };

export default FileUpload;