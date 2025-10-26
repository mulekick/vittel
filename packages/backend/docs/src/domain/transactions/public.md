[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/public

# src/domain/transactions/public

Features that involve public data.

## Remarks

- Scope : DOMAIN / TRANSACTIONS.
- Domain processing can involve calls to the data layer or not.
- Results will be parsed and returned if valid, or and error will be thrown.
- Do not import controller layer modules here to remain framework agnostic.

## Functions

### getData()

```ts
function getData(): Promise<{
}>;
```

Defined in: [src/domain/transactions/public.ts:27](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/public.ts#L27)

Async: call to data layer (public)

#### Returns

`Promise`\<\{
\}\>

#### See

[Data layer call](../../data/database.md#getrandomdataasync)

***

### getFallback()

```ts
function getFallback(): string;
```

Defined in: [src/domain/transactions/public.ts:39](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/public.ts#L39)

Sync: call to data layer (public)

#### Returns

`string`

#### See

[Data layer call](../../data/database.md#getpublicdatasync)
