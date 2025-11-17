[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/public

# src/domain/transactions/public

Features that involve public data.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : DOMAIN / TRANSACTIONS.
* Domain processing can involve calls to the data layer or not.
* Results will be parsed and returned if valid, or and error will be thrown.
* Do not import controller layer modules here to remain framework agnostic.

## Functions

### getData()

```ts
function getData(): Promise<{
}>;
```

Defined in: [src/domain/transactions/public.ts:25](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/domain/transactions/public.ts#L25)

Async: call to data layer (public)

#### Returns

`Promise`<{
}>

#### See

[Data layer call](../../data/database.md#getrandomdata)

***

### getFallback()

```ts
function getFallback(): string;
```

Defined in: [src/domain/transactions/public.ts:37](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/domain/transactions/public.ts#L37)

Sync: call to data layer (public)

#### Returns

`string`

#### See

[Data layer call](../../data/database.md#getpublicdata)
