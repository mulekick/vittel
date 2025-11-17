[**@vittel/backend**](../README.md)

***

[@vittel/backend](../README.md) / src/config

# src/config

Server config file.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : GENERAL.
* Uses dotenv to read the config file according to NODE\_ENV value.
* Loads the config values from process.env and export the resulting config object

## Variables

### default

```ts
const default: BackendConfigSignature;
```

Defined in: [src/config.ts:55](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/config.ts#L55)

Create typed config object ... epic typescript situation, break the app on purpose if the config is missing.
