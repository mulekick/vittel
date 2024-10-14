// import modules
import {Router} from "express";

// import middlewares
import {mFetch, mFallback} from "../middlewares/fetch.ts";

// eslint-disable-next-line new-cap
const xPublic: Router = Router();

xPublic
    // route for fecthing public data
    .get(`/fetch`, mFetch)
    // fallback route for GET
    .get(`*`, mFallback);

export default xPublic;