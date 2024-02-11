// import modules
import {RequestHandler} from "express";

const
    // error throwing middleware
    mError:RequestHandler = () => {
        throw new Error(`some asshole purposely threw an error 😡`);
    };

export default mError;