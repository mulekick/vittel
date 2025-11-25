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

Defined in: [src/config.ts:55](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/config.ts#L55)

Create typed config object.
