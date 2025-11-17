[**@vittel/types**](../README.md)

***

[@vittel/types](../README.md) / src/types

# src/types

Shared types and interfaces.

## Table of contents

* [Remarks](#remarks)
* [Builtin types](#builtin-types)
* [Domain types](#domain-types)
* [React types](#react-types)

## Remarks

* Scope : GENERAL.
* Types / interfaces used across the entire monorepo.
* When using the type-driven development approach, this is the starting point for adding or modifying app features.
* IMPORTANT : to avoid runtime issues, only types should be imported here with "import type".

## Builtin types

* Types that are transversal to all app layers (controller / domain / data).

### Nullable\<T>

```ts
type Nullable<T> = ZodNull | T["_output"];
```

Defined in: [src/types.ts:35](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L35)

Generic type for nullable.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to be rendered nullable. |

***

### ArrayOf\<T>

```ts
type ArrayOf<T> = T["_output"][];
```

Defined in: [src/types.ts:43](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L43)

Generic type for arrays.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to parse the array with. |

***

### PromiseOf\<T>

```ts
type PromiseOf<T> = Promise<T["_output"]>;
```

Defined in: [src/types.ts:51](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L51)

Generic type for promises.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to be promisified. |

***

### TypedFunction\<R, T>

```ts
type TypedFunction<R, T> = TypedFunction<R, T>;
```

Defined in: [src/types.ts:60](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L60)

Generic type for functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`\[] | Function parameters type tuple. |
| `T` | Return value type (can be a promise). |

***

### DomainCallback\<R, T>

```ts
type DomainCallback<R, T> = DomainCallback<R, T>;
```

Defined in: [src/types.ts:81](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L81)

Generic type for functions that bind controller objects to domain callback functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`\[] | The types of controller objects to bind to the domain callback. |
| `T` | The function type of the callback the domain will execute. |

#### Remarks

* This important pattern decouples the controller layer from the domain layer.
* It allows controller objects to bind to callback functions executed in the domain.
* The controller objects are thus passed as default parameters to the bound callback.
* When the controller invokes the domain, the bound callback is passed as an argument.
* Once processing is done, the domain executes the bound callback and passes its own arguments to it.
* As a result, no controller object needs to be imported in the domain ever :
  * The controller is tightly coupled to the domain (this is normal).
  * The domain is **loosely coupled** to any controller object that may call it.
* As a result, each controller can create its own specific callback and pass it to the domain the same way.
* See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
* See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).

***

### TransactionError

Defined in: [src/types.ts:94](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L94)

Domain transaction error object type.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | [`domainErrors`](enums.md#domainerrors) | Domain error that occured during the transaction. | [src/types.ts:95](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L95) |
| <a id="payload"></a> `payload` | `unknown` | Payload that may be associated with the error, unrelated to the original transaction payload. | [src/types.ts:96](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L96) |

***

### AsyncError

Defined in: [src/types.ts:108](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L108)

Unhandled promise rejection error object type.

#### Remarks

* Restores the original stack of the error the promise rejected with.
* Used only in the server unhandled rejections handler.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Correlation id for the async call chains where the promise rejected. | [src/types.ts:109](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L109) |

***

### RequestMock

```ts
type RequestMock = Partial<Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>;
```

Defined in: [src/types.ts:123](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L123)

Jest mock function for express request.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### ResponseMock

```ts
type ResponseMock = Partial<Response<any, Record<string, any>>>;
```

Defined in: [src/types.ts:132](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L132)

Jest mock function for express response.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### NextFunctionMock

```ts
type NextFunctionMock = NextFunction;
```

Defined in: [src/types.ts:141](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L141)

Jest mock function for express next function.

#### Remarks

* Used to write jest unit tests for express middlewares.

***

### BackendConfigSignature

Defined in: [src/types.ts:166](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L166)

Configuration type for the backend server.

#### Remarks

* Common to development and production mode.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dirname"></a> `dirName` | `string` | Server process working directory | [src/types.ts:167](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L167) |
| <a id="vite_srv_entrypoint"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:168](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L168) |
| <a id="app_host"></a> `APP_HOST` | `string` | Express server host | [src/types.ts:169](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L169) |
| <a id="app_port"></a> `APP_PORT` | `number` | Express server port | [src/types.ts:170](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L170) |
| <a id="app_enable_https"></a> `APP_ENABLE_HTTPS` | `boolean` | HTTPS enabled / disabled | [src/types.ts:171](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L171) |
| <a id="app_serve_bundle"></a> `APP_SERVE_BUNDLE` | `boolean` | Server serves react app bundle at / | [src/types.ts:172](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L172) |
| <a id="app_bundle_dir"></a> `APP_BUNDLE_DIR` | `string` | React app bundle directory | [src/types.ts:173](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L173) |
| <a id="app_max_upload_size"></a> `APP_MAX_UPLOAD_SIZE` | `number` | Max size allowed for uploads | [src/types.ts:174](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L174) |
| <a id="app_keypair_alg"></a> `APP_KEYPAIR_ALG` | `string` | The key pair algorithm. | [src/types.ts:175](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L175) |
| <a id="app_cookie_name"></a> `APP_COOKIE_NAME` | `string` | Cookie holding the JWT | [src/types.ts:176](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L176) |
| <a id="app_token_validity"></a> `APP_TOKEN_VALIDITY` | `number` | JWT validity duration in seconds | [src/types.ts:177](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L177) |
| <a id="app_tls_options"></a> `APP_TLS_OPTIONS` | `ServerOptions` | Server TLS configuration options | [src/types.ts:178](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L178) |

***

### FrontendConfigSignature

Defined in: [src/types.ts:191](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L191)

Configuration type for the react client app.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="base_url"></a> `BASE_URL` | `string` | ??? | [src/types.ts:192](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L192) |
| <a id="mode"></a> `MODE` | `string` | Run the app in development or production mode | [src/types.ts:193](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L193) |
| <a id="vite_host"></a> `VITE_HOST` | `string` | Vite server host | [src/types.ts:194](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L194) |
| <a id="vite_port"></a> `VITE_PORT` | `number` | Vite server port | [src/types.ts:195](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L195) |
| <a id="vite_srv_entrypoint-1"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:196](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L196) |

## Domain types

* Types for feature oriented objects from the domain layer.

### FakeMessage

```ts
type FakeMessage = {
  event: string;
  data?: unknown;
};
```

Defined in: [src/types.ts:208](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L208)

Mock message objects.

#### Properties

##### event

```ts
event: string;
```

Defined in: [src/parsers.ts:68](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L68)

##### data?

```ts
optional data: unknown;
```

Defined in: [src/parsers.ts:69](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L69)

***

### SampleData

```ts
type SampleData = {
  data: string;
  timestamp: number;
};
```

Defined in: [src/types.ts:215](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L215)

Sample data objects.

#### Properties

##### data

```ts
data: string;
```

Defined in: [src/parsers.ts:57](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L57)

##### timestamp

```ts
timestamp: number;
```

Defined in: [src/parsers.ts:58](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L58)

## React types

* Types for react component props static typing in the frontend packages.

### ResourceFetchingSignature

Defined in: [src/types.ts:226](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L226)

"Resource fetching" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content"></a> `content` | { `data`: `string`; `timestamp`: `number`; } | [src/types.ts:227](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L227) |
| `content.data` | `string` | [src/parsers.ts:57](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L57) |
| `content.timestamp` | `number` | [src/parsers.ts:58](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/parsers.ts#L58) |

***

### WebTokensSignature

Defined in: [src/types.ts:235](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L235)

"Web tokens" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="protectedcontent"></a> `protectedContent` | `string` | [src/types.ts:236](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L236) |

***

### ModuleBundlingSignature

Defined in: [src/types.ts:244](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L244)

"Module bundling" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="pepe"></a> `pepe` | `string` | [src/types.ts:245](https://github.com/mulekick/vittel/blob/5f5a282cab3549c41384350c4d9168ea7afb97a5/packages/types/src/types.ts#L245) |
