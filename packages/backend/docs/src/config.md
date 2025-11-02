[**@vittel/backend**](../README.md)

***

[@vittel/backend](../README.md) / src/config

# src/config

Server config file.

## Remarks

- Scope : GENERAL.
- Uses dotenv to read the config file according to NODE_ENV value.
- Loads the config values from process.env and export the resulting config object

## Variables

### default

```ts
const default: BackendConfigSignature;
```

Defined in: [src/config.ts:55](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/config.ts#L55)

Create typed config object ... epic typescript situation, break the app on purpose if the config is missing.
