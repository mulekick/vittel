// proxying of the values retrieved from the vite-specific env property through
// this module is mandatory so it can be mocked in the jest tests for the app
// @ts-expect-error vite-specific env property
const {BASE_URL, MODE, VITE_HOST, VITE_PORT, VITE_SRV_ENTRYPOINT} = import.meta.env as Record<string, string>;

// reexport ...
export {
    BASE_URL,
    MODE,
    VITE_HOST,
    VITE_PORT,
    VITE_SRV_ENTRYPOINT
};