[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/protected

# src/controller/middlewares/protected

Feature-specific express middleware.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Middlewares that call the protected API and use middleware wrapper for error routing.

## Variables

### mToken

```ts
const mToken: RequestHandler;
```

Defined in: [src/controller/middlewares/protected.ts:26](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/controller/middlewares/protected.ts#L26)

Delivers a token everytime, equivalent to the '/login' route

#### See

[Issue a token](../../domain/transactions/protected.md#issuetoken)

***

### mProtection

```ts
const mProtection: RequestHandler;
```

Defined in: [src/controller/middlewares/protected.ts:50](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/controller/middlewares/protected.ts#L50)

Protection middleware, verifies JWT validity

#### See

[Validate a token](../../domain/transactions/protected.md#validatetoken)

***

### mFallback

```ts
const mFallback: RequestHandler;
```

Defined in: [src/controller/middlewares/protected.ts:61](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/controller/middlewares/protected.ts#L61)

Fallback middleware

#### See

[Get fallback data](../../domain/transactions/protected.md#getfallback)
