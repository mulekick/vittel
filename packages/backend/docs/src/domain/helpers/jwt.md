[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/helpers/jwt

# src/domain/helpers/jwt

Feature agnostic helpers.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : DOMAIN / HELPERS.
* Implements feature-agnostic helpers in dedicated modules.
* Helpers functions should not involve the controller or data layers.

## Functions

### signToken()

```ts
function signToken(payload): Promise<string>;
```

Defined in: [src/domain/helpers/jwt.ts:43](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/helpers/jwt.ts#L43)

Create jwt string from payload object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | `JWTPayload` |

#### Returns

`Promise`<`string`>

***

### verifyToken()

```ts
function verifyToken(token): Promise<JWTVerifyResult<JWTPayload>>;
```

Defined in: [src/domain/helpers/jwt.ts:60](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/helpers/jwt.ts#L60)

Verify jwt signature from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `string` |

#### Returns

`Promise`<`JWTVerifyResult`<`JWTPayload`>>
