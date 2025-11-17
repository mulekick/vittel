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

Defined in: [src/data/filesystem.ts:19](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/backend/src/data/filesystem.ts#L19)

Sync: creates a writable stream to a file system path (demonstration: discard file to /dev/null)

#### Returns

`WriteStream`
