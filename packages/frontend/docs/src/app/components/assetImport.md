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

Defined in: [src/app/components/assetImport.tsx:25](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/frontend/src/app/components/assetImport.tsx#L25)

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
