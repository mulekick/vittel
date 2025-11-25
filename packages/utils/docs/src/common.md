[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/common

# src/common

Common shared utility functions.

## Table of contents

* [Remarks](#remarks)
* [1. Miscellaneous](#1-miscellaneous)

## Remarks

* Scope : GENERAL
* Utility functions that cover all app layers (controller, domain and data).
* Centralized in a dedicated package to avoid code redundancy across packages.
* This module can be imported in node.js based packages as well as browser packages.

## 1. Miscellaneous

* Provides centralized, feature agnostic miscellaneous features.

### configParseNumber()

```ts
function configParseNumber(value, defaultValue): number;
```

Defined in: [src/common.ts:18](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/common.ts#L18)

Config only util to handle type conversion from dotenv values.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |
| `defaultValue` | `number` |

#### Returns

`number`

***

### rnd()

```ts
function rnd(lb, ub): number;
```

Defined in: [src/common.ts:24](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/common.ts#L24)

Returns a random number between 2 values.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `lb` | `number` |
| `ub` | `number` |

#### Returns

`number`
