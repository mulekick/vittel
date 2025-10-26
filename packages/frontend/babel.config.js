import config from "../../babel.config.js";

export default {
    ...config,
    // add react preset
    presets: [ ...config.presets, `@babel/preset-react` ]
};