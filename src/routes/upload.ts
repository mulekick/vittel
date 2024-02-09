// import modules
import {Router} from "express";

// import middlewares
import mUpload from "../middlewares/upload.ts";

const
    // eslint-disable-next-line new-cap
    xUpload:Router = Router();

xUpload
    // setup routes to process file uploads
    .post(`/`, mUpload);

export default xUpload;