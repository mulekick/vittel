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

Defined in: [src/controller/routes/routes.ts:23](https://github.com/mulekick/vittel/blob/249072cb474ae5036ea5c46e6158484d6ffccf51/packages/backend/src/controller/routes/routes.ts#L23)

Mounts imported routers on the app entrypoint

#### See

* [Route for serving public data](public.md#xpublic)
* [Route for serving protected data](protected.md#xprotected)
* [Route for benchmarking error handlers](errors.md#xerrors)
