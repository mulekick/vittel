[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/public

# src/controller/middlewares/public

Feature-specific express middleware.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Middlewares that call the public API and use middleware wrapper for error routing.

## Variables

### mFetch

```ts
const mFetch: RequestHandler;
```

Defined in: [src/controller/middlewares/public.ts:20](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/backend/src/controller/middlewares/public.ts#L20)

Async data fetching middleware

#### See

[Get public data](../../domain/transactions/public.md#getdata)

***

### mFallback

```ts
const mFallback: RequestHandler;
```

Defined in: [src/controller/middlewares/public.ts:31](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/backend/src/controller/middlewares/public.ts#L31)

Sync fallback middleware

#### See

[Get fallback data](../../domain/transactions/public.md#getfallback)
