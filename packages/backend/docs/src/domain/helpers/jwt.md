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

Defined in: [src/domain/helpers/jwt.ts:42](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/domain/helpers/jwt.ts#L42)

Async: create jwt string from payload object

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

Defined in: [src/domain/helpers/jwt.ts:59](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/domain/helpers/jwt.ts#L59)

Async: verify jwt signature from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `string` |

#### Returns

`Promise`<`JWTVerifyResult`<`JWTPayload`>>
