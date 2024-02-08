// import modules
import {Router} from "express";

// import middlewares
import {mtoken, mprotection, mfallback} from "../middlewares/protected.ts";

const
    // eslint-disable-next-line new-cap
    xprotected:Router = Router();

xprotected
    // token serving middleware
    .get(`/token`, mtoken)
    // protection middleware
    .use(mprotection)
    // protected resources sit there
    .get(`*`, mfallback);

export default xprotected;