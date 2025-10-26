[**@vittel/backend**](../../README.md)

***

[@vittel/backend](../../README.md) / src/data/database

# src/data/database

Database access features.

## Remarks

- Scope : DATA.
- Implements vendor specific database access features.
- Returns results to the domain layer for validation and parsing.

## Functions

### getRandomDataAsync()

```ts
function getRandomDataAsync(): Promise<string>;
```

Defined in: [src/data/database.ts:16](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/data/database.ts#L16)

Async: emulates database read (public)

#### Returns

`Promise`\<`string`\>

***

### getPublicDataSync()

```ts
function getPublicDataSync(): string;
```

Defined in: [src/data/database.ts:24](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/data/database.ts#L24)

Sync: emulates database read (public)

#### Returns

`string`

***

### getProtectedDataSync()

```ts
function getProtectedDataSync(): string;
```

Defined in: [src/data/database.ts:29](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/data/database.ts#L29)

Sync: emulates database read (protected)

#### Returns

`string`
