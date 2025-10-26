[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/common

# src/common

Common shared utility functions.

## Remarks

- Scope : GENERAL
- Utility functions that cover all app layers (controller, domain and data).
- Centralized in a dedicated package to avoid code redundancy across packages.
- Domain-specific functions will be declared at the package scope.
- This module can be imported in node.js based packages as well as browser packages.

## Miscellaneous

- Provides centralized, feature agnostic miscellaneous features.

### configParseNumber()

```ts
function configParseNumber(value, defaultValue): number;
```

Defined in: [src/common.ts:19](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/common.ts#L19)

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

Defined in: [src/common.ts:25](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/common.ts#L25)

Returns a random number between 2 values.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `lb` | `number` |
| `ub` | `number` |

#### Returns

`number`
