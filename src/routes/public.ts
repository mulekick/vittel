// import modules
import {Router} from "express";

// import middlewares
import {mFetch, mFallback} from "../middlewares/fetch.ts";
import mUpload from "../middlewares/upload.ts";

const
    // eslint-disable-next-line new-cap
    xPublic:Router = Router();

xPublic
    // route for fecthing public data
    .get(`/fetch`, mFetch)
    // route to process file uploads
    .post(`/upload`, mUpload)
    // fallback route for GET
    .get(`*`, mFallback);

export default xPublic;