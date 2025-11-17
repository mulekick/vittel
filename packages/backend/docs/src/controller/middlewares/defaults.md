[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/defaults

# src/controller/middlewares/defaults

Default express middlewares.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Default fallback middleware and error request handler for express.

## Variables

### defaultFallback

```ts
const defaultFallback: RequestHandler;
```

Defined in: [src/controller/middlewares/defaults.ts:20](https://github.com/mulekick/vittel/blob/e648aef454ae6678a0d7fc63d24047e731841937/packages/backend/src/controller/middlewares/defaults.ts#L20)

Sync: app-wide default fallback middleware, uses wrapper for error routing

***

### errorHandling

```ts
const errorHandling: ErrorRequestHandler;
```

Defined in: [src/controller/middlewares/defaults.ts:31](https://github.com/mulekick/vittel/blob/e648aef454ae6678a0d7fc63d24047e731841937/packages/backend/src/controller/middlewares/defaults.ts#L31)

Async: app-wide error handling middleware (must match ErrorRequestHandler function type)

#### See

handleError | General error handler

#### Remarks

* ***Caution : the `next` parameter must be present for the errors to route correctly.***
