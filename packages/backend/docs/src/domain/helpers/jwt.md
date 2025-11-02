[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/helpers/jwt

# src/domain/helpers/jwt

Feature agnostic helpers.

## Remarks

- Scope : DOMAIN / HELPERS.
- Implements feature-agnostic helpers in dedicated modules.
- Helpers functions should not involve the controller or data layers.

## Functions

### signToken()

```ts
function signToken(payload): Promise<string>;
```

Defined in: [src/domain/helpers/jwt.ts:42](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/helpers/jwt.ts#L42)

Async: create jwt string from payload object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | `JWTPayload` |

#### Returns

`Promise`\<`string`\>

***

### verifyToken()

```ts
function verifyToken(token): Promise<JWTVerifyResult<JWTPayload>>;
```

Defined in: [src/domain/helpers/jwt.ts:59](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/helpers/jwt.ts#L59)

Async: verify jwt signature from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `string` |

#### Returns

`Promise`\<`JWTVerifyResult`\<`JWTPayload`\>\>
