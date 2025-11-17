[**@vittel/frontend**](../../../README.md)

***

[@vittel/frontend](../../../README.md) / src/app/components/assetImport

# src/app/components/assetImport

Static assets imports component.

## Table of contents

* [Remarks](#remarks)
* [Functions](#functions)

## Remarks

* Scope : CLIENT / COMPONENTS.

## Functions

### default()

```ts
function default(props): Element;
```

Defined in: [src/app/components/assetImport.tsx:24](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/frontend/src/app/components/assetImport.tsx#L24)

Minimal component for static assets imports support.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `Record`<`string`, `never`> |

#### Returns

`Element`

#### Remarks

Vite supports importing any asset as an url - in this case it is mandatory
To use a named import and access the asset programatically for it to be included
In the build (eg. set the img src attribute programatically) ...
