[**@vittel/frontend**](../../../README.md)

***

[@vittel/frontend](../../../README.md) / src/app/helpers/helpers

# src/app/helpers/helpers

Feature-agnostic client side helpers.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : CLIENT / HELPERS.

## Functions

### getStringAsync()

```ts
function getStringAsync(route, hydrate): Promise<void>;
```

Defined in: [src/app/helpers/helpers.ts:20](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/frontend/src/app/helpers/helpers.ts#L20)

Async helper for GET requests to the server API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `route` | `string` |
| `hydrate` | `Dispatch`<`SetStateAction`<`string`>> |

#### Returns

`Promise`<`void`>

***

### getObjectAsync()

```ts
function getObjectAsync(route, hydrate): Promise<void>;
```

Defined in: [src/app/helpers/helpers.ts:40](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/frontend/src/app/helpers/helpers.ts#L40)

Async helper for GET requests to the server API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `route` | `string` |
| `hydrate` | `Dispatch`<`SetStateAction`<{ }>> |

#### Returns

`Promise`<`void`>

***

### postFileAsync()

```ts
function postFileAsync(
   route, 
   hydrate, 
body): Promise<void>;
```

Defined in: [src/app/helpers/helpers.ts:63](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/frontend/src/app/helpers/helpers.ts#L63)

Async helper for POST requests to the server API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `route` | `string` |
| `hydrate` | `Dispatch`<`SetStateAction`<`string`>> |
| `body` | `FormData` |

#### Returns

`Promise`<`void`>

***

### getPepe()

```ts
function getPepe(): string;
```

Defined in: [src/app/helpers/helpers.ts:86](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/frontend/src/app/helpers/helpers.ts#L86)

Helper for client-side bundled module.

#### Returns

`string`
