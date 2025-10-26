[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/routes

# src/controller/routes/routes

Main express router

## Remarks

- Scope : CONTROLLER / ROUTES.
- Mounts specific routers to VITE_SRV_ENTRYPOINT to expose the server API.

## Variables

### xRoutes

```ts
const xRoutes: Router;
```

Defined in: [src/controller/routes/routes.ts:21](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/routes/routes.ts#L21)

Mounts imported routers on the app entrypoint

#### See

 - [Route for serving public data](public.md#xpublic)
 - [Route for serving protected data](protected.md#xprotected)
 - [Route for benchmarking error handlers](errors.md#xerrors)
