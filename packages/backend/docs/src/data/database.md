[**@vittel/backend**](../../README.md)

***

[@vittel/backend](../../README.md) / src/data/database

# src/data/database

Database access features.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : DATA.
* Implements vendor specific database access features.
* Imports shared data access features, binds to specific db client.
* Returns results to the domain for validation and parsing.
* TODO : import a wrapper class for db client, pass client instance to the contructor :
  1. Client is instantiated in backend package data layer (npm packages do not include configs)
  2. Data accessors are implemented as methods of the wrapper class, `DataAccessor` type may become superfluous.

## Variables

### dbClient

```ts
const dbClient: FakeDatabaseClient;
```

Defined in: [src/data/database.ts:27](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/data/database.ts#L27)

Create database client

#### Remarks

* Config for the db client is package-specific so it has to be created here.
* A `ready` callback will be added in the server main file.

***

### randomData

```ts
const randomData: DataAccessor<[FakeDatabaseClient], typeof getRandomData>;
```

Defined in: [src/data/database.ts:32](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/data/database.ts#L32)

Bind imports to db client

***

### publicData

```ts
const publicData: DataAccessor<[FakeDatabaseClient], typeof getPublicData>;
```

Defined in: [src/data/database.ts:37](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/data/database.ts#L37)

Bind imports to db client

***

### protectedData

```ts
const protectedData: DataAccessor<[FakeDatabaseClient], typeof getProtectedData>;
```

Defined in: [src/data/database.ts:42](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/data/database.ts#L42)

Bind imports to db client

***

### writableStreamToFile

```ts
const writableStreamToFile: DataAccessor<[FakeDatabaseClient], typeof getWritableStreamToFile>;
```

Defined in: [src/data/database.ts:47](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/data/database.ts#L47)

Bind imports to db client
