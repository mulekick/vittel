[**@vittel/backend**](../../README.md)

***

[@vittel/backend](../../README.md) / src/data/filesystem

# src/data/filesystem

File system access features.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : DATA.
* Implements vendor specific file system access features.
* Returns results to the domain layer for validation and parsing.

## Functions

### getWritableStreamToFile()

```ts
function getWritableStreamToFile(): WriteStream;
```

Defined in: [src/data/filesystem.ts:19](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/data/filesystem.ts#L19)

Sync: creates a writable stream to a file system path (demonstration: discard file to /dev/null)

#### Returns

`WriteStream`
