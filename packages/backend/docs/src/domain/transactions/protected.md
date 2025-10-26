[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/protected

# src/domain/transactions/protected

Features that involve restricted / protected data.

## Remarks

- Scope : DOMAIN / TRANSACTIONS.
- Domain processing can involve calls to the data layer or not.
- Results will be parsed and returned if valid, or and error will be thrown.
- Do not import controller layer modules here to remain framework agnostic.

## Functions

### issueToken()

```ts
function issueToken(): Promise<string>;
```

Defined in: [src/domain/transactions/protected.ts:27](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/protected.ts#L27)

Async: call to domain jwt issuance helper, will throw on fail

#### Returns

`Promise`\<`string`\>

***

### validateToken()

```ts
function validateToken(token): Promise<null>;
```

Defined in: [src/domain/transactions/protected.ts:33](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/protected.ts#L33)

Async: call to domain jwt validation helper, will throw on fail

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `undefined` \| `string` |

#### Returns

`Promise`\<`null`\>

#### See

[Sign token](../helpers/jwt.md#signtoken)

***

### getFallback()

```ts
function getFallback(): string;
```

Defined in: [src/domain/transactions/protected.ts:57](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/protected.ts#L57)

Sync: call to data layer (protected)

#### Returns

`string`

#### See

[Data layer call](../../data/database.md#getprotecteddatasync)
