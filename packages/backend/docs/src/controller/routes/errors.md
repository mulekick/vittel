[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/errors

# src/controller/routes/errors

Feature-specific express router.

## Remarks

- Scope : CONTROLLER / ROUTES.
- Routes that expose the error handling patterns API.

## Variables

### xErrors

```ts
const xErrors: Router;
```

Defined in: [src/controller/routes/errors.ts:20](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/routes/errors.ts#L20)

Mounts error handling patterns API middlewares on /error

#### See

 - [Route for throwing an error](../middlewares/errors.md#mthrowerrorsync)
 - [Route for emitting an error](../middlewares/errors.md#memiterrorasync)
