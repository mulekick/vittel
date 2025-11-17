[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/routes

# src/controller/routes/routes

Main express router

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / ROUTES.
* Mounts specific routers to VITE\_SRV\_ENTRYPOINT to expose the server API.

## Variables

### xRoutes

```ts
const xRoutes: Router;
```

Defined in: [src/controller/routes/routes.ts:21](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/controller/routes/routes.ts#L21)

Mounts imported routers on the app entrypoint

#### See

* [Route for serving public data](public.md#xpublic)
* [Route for serving protected data](protected.md#xprotected)
* [Route for benchmarking error handlers](errors.md#xerrors)
