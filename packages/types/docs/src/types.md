[**@vittel/types**](../README.md)

***

[@vittel/types](../README.md) / src/types

# src/types

Shared types and interfaces.

## Table of contents

* [Remarks](#remarks)
* [1. Builtin types](#1-builtin-types)
* [2. Domain types](#2-domain-types)
* [3. React types](#3-react-types)

## Remarks

* Scope : GENERAL.
* Types and interfaces used across the entire monorepo.
* When using the type-driven development approach, this is the starting point for modifying app features.
* IMPORTANT : to avoid runtime issues, only types should be imported here with `import type`.

## 1. Builtin types

* Types that are transversal to all app layers (controller / domain / data).

### TypedFunction

```ts
type TypedFunction<R, T> = TypedFunction<R, T>;
```

Defined in: [src/types.ts:36](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L36)

Generic type for functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`\[] | Function parameters type tuple. |
| `T` | Return value type (can be a promise). |

***

### ControllerCallback

```ts
type ControllerCallback<R, T> = ControllerCallback<R, T>;
```

Defined in: [src/types.ts:61](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L61)

Generic type for controller callbacks.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`\[] | Types of controller objects to bind to the callback. |
| `T` | Domain function type expression. |

#### Remarks

* The controller queries the domain by invoking domain functions.
* The controller declares callbacks to process requests and responses :
  * A controller callback references controller-specific objects (middlewares).
  * A controller callback also expects domain-provided results.
* The controller then imports and calls the domain function :
  * It binds the relevant controller objects to the callback.
  * It passes the callback as an argument to the domain function.
  * The domain function executes the callback and passes the results to it.
* This pattern decouples the controller layer from the domain layer :
  * The controller is tightly coupled to the domain (this is normal).
  * The domain is **loosely coupled** to any controller object that may call it.
* As a result, no controller object needs to be imported in the domain ever.
* Each controller creates its own callbacks and pass it to the domain the same way.
* See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
* See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).

***

### DataAccessor

```ts
type DataAccessor<R, T> = DataAccessor<R, T>;
```

Defined in: [src/types.ts:85](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L85)

Generic type for data accessors.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`\[] | Types of data layer objects that bind to the accessor. |
| `T` | Domain function type expression. |

#### Remarks

* The domain queries the data layer by invoking data accessors.
* The data layer exposes its API by exporting accessor functions :
  * An accessor function is bound to data-specific objects (db clients).
  * An accessor function also returns domain-expected results.
* The domain then imports and calls the accessor function :
  * It only needs to pass domain-specific values to the accessor as arguments.
  * The accessor then executes and returns the domain-expected results.
* This pattern decouples the domain layer from the data layer :
  * The data layer is tightly coupled to the domain (this is normal).
  * The domain is **loosely coupled** to any accessor that it may call.
* As a result, no data layer object needs to be imported in the domain ever.
* Each data layer creates its own accessors and exports it the same way.
* See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
* See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).

***

### TransactionError

Defined in: [src/types.ts:98](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L98)

Domain transaction error object type.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | [`domainErrors`](enums.md#domainerrors) | Domain error that occured during the transaction. | [src/types.ts:99](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L99) |
| <a id="payload"></a> `payload` | `unknown` | Payload associated with the error, unrelated to the original transaction payload. | [src/types.ts:100](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L100) |

***

### AsyncError

Defined in: [src/types.ts:112](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L112)

Unhandled promise rejection error object type.

#### Remarks

* Restores the original stack of the error the promise rejected with.
* Used only in the server unhandled rejections handler.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Correlation id for the async call chains where the promise rejected. | [src/types.ts:113](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L113) |

***

### RequestMock

```ts
type RequestMock = Partial<Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>;
```

Defined in: [src/types.ts:127](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L127)

Jest mock function for express request.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### ResponseMock

```ts
type ResponseMock = Partial<Response<any, Record<string, any>>>;
```

Defined in: [src/types.ts:136](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L136)

Jest mock function for express response.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### NextFunctionMock

```ts
type NextFunctionMock = NextFunction;
```

Defined in: [src/types.ts:145](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L145)

Jest mock function for express next function.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### BackendConfigSignature

Defined in: [src/types.ts:170](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L170)

Configuration type for the backend server.

#### Remarks

* Common to development and production mode.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dirname"></a> `dirName` | `string` | Server process working directory | [src/types.ts:171](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L171) |
| <a id="vite_srv_entrypoint"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:172](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L172) |
| <a id="app_host"></a> `APP_HOST` | `string` | Express server host | [src/types.ts:173](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L173) |
| <a id="app_port"></a> `APP_PORT` | `number` | Express server port | [src/types.ts:174](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L174) |
| <a id="app_enable_https"></a> `APP_ENABLE_HTTPS` | `boolean` | HTTPS enabled / disabled | [src/types.ts:175](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L175) |
| <a id="app_serve_bundle"></a> `APP_SERVE_BUNDLE` | `boolean` | Server serves react app bundle at / | [src/types.ts:176](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L176) |
| <a id="app_bundle_dir"></a> `APP_BUNDLE_DIR` | `string` | React app bundle directory | [src/types.ts:177](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L177) |
| <a id="app_max_upload_size"></a> `APP_MAX_UPLOAD_SIZE` | `number` | Max size allowed for uploads | [src/types.ts:178](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L178) |
| <a id="app_keypair_alg"></a> `APP_KEYPAIR_ALG` | `string` | The key pair algorithm. | [src/types.ts:179](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L179) |
| <a id="app_cookie_name"></a> `APP_COOKIE_NAME` | `string` | Cookie holding the JWT | [src/types.ts:180](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L180) |
| <a id="app_token_validity"></a> `APP_TOKEN_VALIDITY` | `number` | JWT validity duration in seconds | [src/types.ts:181](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L181) |
| <a id="app_tls_options"></a> `APP_TLS_OPTIONS` | `ServerOptions` | Server TLS configuration options | [src/types.ts:182](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L182) |

***

### FrontendConfigSignature

Defined in: [src/types.ts:195](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L195)

Configuration type for the react client app.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="base_url"></a> `BASE_URL` | `string` | ??? | [src/types.ts:196](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L196) |
| <a id="mode"></a> `MODE` | `string` | Run the app in development or production mode | [src/types.ts:197](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L197) |
| <a id="vite_host"></a> `VITE_HOST` | `string` | Vite server host | [src/types.ts:198](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L198) |
| <a id="vite_port"></a> `VITE_PORT` | `number` | Vite server port | [src/types.ts:199](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L199) |
| <a id="vite_srv_entrypoint-1"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:200](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L200) |

## 2. Domain types

* Types for feature oriented objects from the domain layer.

### SampleMessage

```ts
type SampleMessage = {
  event: string;
  data: unknown;
};
```

Defined in: [src/types.ts:212](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L212)

Mock message objects.

#### Properties

##### event

```ts
event: string;
```

Defined in: [src/parsers.ts:33](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L33)

##### data

```ts
data: unknown;
```

Defined in: [src/parsers.ts:34](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L34)

***

### SampleData

```ts
type SampleData = {
  data: string;
  timestamp: number;
};
```

Defined in: [src/types.ts:219](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L219)

Sample data objects.

#### Properties

##### data

```ts
data: string;
```

Defined in: [src/parsers.ts:22](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L22)

##### timestamp

```ts
timestamp: number;
```

Defined in: [src/parsers.ts:23](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L23)

## 3. React types

* Types for react component props static typing in the frontend packages.

### ResourceFetchingProps

Defined in: [src/types.ts:230](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L230)

"Resource fetching" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content"></a> `content` | { `data`: `string`; `timestamp`: `number`; } | [src/types.ts:231](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L231) |
| `content.data` | `string` | [src/parsers.ts:22](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L22) |
| `content.timestamp` | `number` | [src/parsers.ts:23](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L23) |

***

### WebTokensProps

Defined in: [src/types.ts:239](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L239)

"Web tokens" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="protectedcontent"></a> `protectedContent` | `string` | [src/types.ts:240](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L240) |

***

### ModuleBundlingProps

Defined in: [src/types.ts:248](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L248)

"Module bundling" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="pepe"></a> `pepe` | `string` | [src/types.ts:249](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/types.ts#L249) |
