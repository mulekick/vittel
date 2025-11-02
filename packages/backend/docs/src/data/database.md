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

### getRandomData()

```ts
function getRandomData(): Promise<string>;
```

Defined in: [src/data/database.ts:16](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/data/database.ts#L16)

Async: emulates database read (public)

#### Returns

`Promise`\<`string`\>

***

### getPublicData()

```ts
function getPublicData(): string;
```

Defined in: [src/data/database.ts:24](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/data/database.ts#L24)

Sync: emulates database read (public)

#### Returns

`string`

***

### getProtectedData()

```ts
function getProtectedData(): string;
```

Defined in: [src/data/database.ts:29](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/data/database.ts#L29)

Sync: emulates database read (protected)

#### Returns

`string`
