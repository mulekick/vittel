/**
 * File upload component.
 * @module
 * @remarks
 * - Scope : CLIENT / COMPONENTS.
 */

// import modules
import React, {useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import config from "../helpers/env.ts";
import {postFileAsync} from "../helpers/helpers.ts";

// retrieve environment
const {VITE_SRV_ENTRYPOINT} = config;

/**
 * Minimal component for file upload support.
 */
const FileUpload = (props: Record<string, never>): React.JSX.Element => {
    void props;
    // message
    const [ lastUploaded, setLastUploaded ] = useState<string>(``);
    // DOM ref to form
    const formRef = useRef<HTMLFormElement | null>(null);
    // handler
    const onSubmit = (ev: React.FormEvent) => {
        // use form data
        ev.preventDefault();
        // typescript ...
        if (formRef.current === null)
            return;
        // make synchronous calls and pass the state update functions
        void postFileAsync(`${ VITE_SRV_ENTRYPOINT }/protected/upload`, setLastUploaded, new FormData(formRef.current));
    };

    return (
        <article>
            { /* file upload */ }
            <span className={ `small highlight` }>
                <FontAwesomeIcon icon={ faSquareCheck } />
                { ` ` }
                { `File uploads (100 kb max, requires token):` }
            </span>
            { /* set form action for uploads */ }
            <form className={ `small` } encType={ `multipart/form-data` } ref={ formRef } onSubmit={ onSubmit }>
                <p><input type={ `file` } name={ `afile` } data-testid={ `afile` } /></p>
                <input type={ `submit` } value={ `upload file` } />
            </form>
            { lastUploaded ? <span className={ `small` }>{ lastUploaded }</span> : null }
        </article>
    );
};

export default FileUpload;