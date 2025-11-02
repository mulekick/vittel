[**@vittel/frontend**](../../../README.md)

***

[@vittel/frontend](../../../README.md) / src/app/helpers/env

# src/app/helpers/env

Client-side environment variables.

## Remarks

- Scope : CLIENT / HELPERS.
- This module proxyies the values retrieved from the vite-specific env property
- Doing so is mandatory so the config can be mocked in the jest tests for the app.
- Type annotations are needed because of the tsconfig "isolatedModules" flag.

## Variables

### default

```ts
const default: FrontendConfigSignature;
```

Defined in: [src/app/helpers/env.ts:20](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/frontend/src/app/helpers/env.ts#L20)
