// import modules
import {Router} from "express";

// import middlewares
import mupload from "../middlewares/upload.ts";

const
    // eslint-disable-next-line new-cap
    xupload:Router = Router();

xupload
    // setup routes to process file uploads
    .post(`/`, mupload);

export default xupload;