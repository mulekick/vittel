[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/protected

# src/domain/transactions/protected

Features that involve restricted / protected data.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : DOMAIN / TRANSACTIONS.
* Domain processing can involve calls to the data layer or not.
* Results will be parsed and returned if valid, or and error will be thrown.
* Do not import controller layer modules here to remain framework agnostic.

## Functions

### issueToken()

```ts
function issueToken(): Promise<string>;
```

Defined in: [src/domain/transactions/protected.ts:22](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/protected.ts#L22)

Call to domain jwt issuance helper, will throw on fail

#### Returns

`Promise`<`string`>

***

### validateToken()

```ts
function validateToken(token): Promise<null>;
```

Defined in: [src/domain/transactions/protected.ts:28](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/protected.ts#L28)

Call to domain jwt validation helper, will throw on fail

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `string` | `undefined` |

#### Returns

`Promise`<`null`>

#### See

[Sign token](../helpers/jwt.md#signtoken)

***

### getFallback()

```ts
function getFallback(): string;
```

Defined in: [src/domain/transactions/protected.ts:52](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/protected.ts#L52)

Call to data layer (protected)

#### Returns

`string`

#### See

getProtectedData | Data layer call
