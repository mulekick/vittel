// import modules
import {Router} from "express";

// import middlewares
import {mFetch, mFallback} from "../middlewares/fetch.ts";

const
    // eslint-disable-next-line new-cap
    xPublic:Router = Router();

xPublic
    // route for fecthing public data
    .get(`/fetch`, mFetch)
    // fallback route for GET
    .get(`*`, mFallback);

export default xPublic;