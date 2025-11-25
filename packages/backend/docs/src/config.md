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
* Loads the config values from process.env and export a config object

## Variables

### default

```ts
const default: BackendConfigSignature;
```

Defined in: [src/config.ts:55](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/backend/src/config.ts#L55)

Create typed config object.
