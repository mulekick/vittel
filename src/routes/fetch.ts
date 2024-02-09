// import modules
import {Router} from "express";

// import middlewares
import {mFetch, mFallback} from "../middlewares/fetch.ts";

const
    // eslint-disable-next-line new-cap
    xFetch:Router = Router();

xFetch
    // setup routes to serve fetch requests
    .get(`/inline`, mFetch)
    // fallback route for GET
    .get(`*`, mFallback);

export default xFetch;