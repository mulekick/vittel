[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/defaults

# src/controller/middlewares/defaults

Default express middlewares.

## Remarks

- Scope : CONTROLLER / MIDDLEWARES.
- Default fallback middleware and error request handler for express.

## Variables

### defaultFallback

```ts
const defaultFallback: RequestHandler;
```

Defined in: [src/controller/middlewares/defaults.ts:20](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/defaults.ts#L20)

Sync: app-wide default fallback middleware, uses wrapper for error routing

***

### errorHandling

```ts
const errorHandling: ErrorRequestHandler;
```

Defined in: [src/controller/middlewares/defaults.ts:29](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/defaults.ts#L29)

Async: app-wide error handling middleware (must match ErrorRequestHandler function type)

#### See

handleError \| General error handler
