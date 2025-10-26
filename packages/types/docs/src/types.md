[**@vittel/types**](../README.md)

***

[@vittel/types](../README.md) / src/types

# src/types

Shared types and interfaces.

## Remarks

- Scope : GENERAL.
- Types / interfaces used across the entire monorepo.
- When using the type-driven development approach, this is the starting point for adding or modifying app features.
- IMPORTANT : to avoid runtime issues, only types should be imported here with "import type".

## Builtin types

- Types that are transversal to all app layers (controller / domain / data).

### Nullable\<T\>

```ts
type Nullable<T> = ZodNull | T["_output"];
```

Defined in: [src/types.ts:35](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L35)

Generic type for nullable.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to be rendered nullable. |

***

### ArrayOf\<T\>

```ts
type ArrayOf<T> = T["_output"][];
```

Defined in: [src/types.ts:43](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L43)

Generic type for arrays.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to parse the array with. |

***

### PromiseOf\<T\>

```ts
type PromiseOf<T> = Promise<T["_output"]>;
```

Defined in: [src/types.ts:51](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L51)

Generic type for promises.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `z.ZodTypeAny` | Initial type to be promisified. |

***

### TypedFunction\<R, T\>

```ts
type TypedFunction<R, T> = TypedFunction<R, T>;
```

Defined in: [src/types.ts:60](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L60)

Generic type for functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`[] | Function parameters type tuple. |
| `T` | Return value type (can be a promise). |

***

### AsyncContextWrapper\<T\>

```ts
type AsyncContextWrapper<T> = AsyncContextWrapper<T>;
```

Defined in: [src/types.ts:72](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L72)

Function type for wrappers that provide local context tracking support for async functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The return type of the function. |

#### Type Param

The parameter types for the function.

#### Remarks

- Returns a function that executes the function passed as parameter with async context support.
- Pass an existing uuid when calling the wrapper if the call was triggered from another service.

***

### BindDomainCallback\<R, T\>

```ts
type BindDomainCallback<R, T> = BindDomainCallback<R, T>;
```

Defined in: [src/types.ts:93](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L93)

Generic type for functions that bind controller objects to domain callback functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` *extends* `unknown`[] | The types of controller objects to bind to the domain callback. |
| `T` | The function type of the callback the domain will execute. |

#### Remarks

- This important pattern decouples the controller layer from the domain layer.
- It allows controller objects to bind to callback functions executed in the domain.
- The controller objects are thus passed as default parameters to the bound callback.
- When the controller invokes the domain, the bound callback is passed as an argument.
- Once processing is done, the domain executes the bound callback and passes its own arguments to it.
- As a result, no controller object needs to be imported in the domain ever :
  - The controller is tightly coupled to the domain (this is normal).
  - The domain is **loosely coupled** to any controller object that may call it.
- As a result, each controller can create its own specific callback and pass it to the domain the same way.
- See [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
- See also [parameters vs arguments](https://developer.mozilla.org/en-US/docs/Glossary/Parameter#parameters_versus_arguments) (for clarity).

***

### TransactionError

Defined in: [src/types.ts:106](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L106)

Domain transaction error object type.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | [`domainErrors`](enums.md#domainerrors) | Domain error that occured during the transaction. | [src/types.ts:107](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L107) |
| <a id="payload"></a> `payload` | `unknown` | Payload that may be associated with the error, unrelated to the original transaction payload. | [src/types.ts:108](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L108) |

***

### AsyncError

Defined in: [src/types.ts:120](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L120)

Unhandled promise rejection error object type.

#### Remarks

- Restores the original stack of the error the promise rejected with.
- Used only in the server unhandled rejections handler.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Correlation id for the async call chains where the promise rejected. | [src/types.ts:121](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L121) |

***

### RequestMock

```ts
type RequestMock = Partial<Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>;
```

Defined in: [src/types.ts:135](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L135)

Jest mock function for express request.

#### Remarks

- Used to write jest unit tests for express middlewares.

***

### ResponseMock

```ts
type ResponseMock = Partial<Response<any, Record<string, any>>>;
```

Defined in: [src/types.ts:144](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L144)

Jest mock function for express response.

#### Remarks

- Used to write jest unit tests for express middlewares.

***

### NextFunctionMock

```ts
type NextFunctionMock = NextFunction;
```

Defined in: [src/types.ts:153](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L153)

Jest mock function for express next function.

#### Remarks

- Used to write jest unit tests for express middlewares.

***

### BackendConfigSignature

Defined in: [src/types.ts:178](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L178)

Configuration type for the backend server.

#### Remarks

- Common to development and production mode.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dirname"></a> `dirName` | `string` | Server process working directory | [src/types.ts:179](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L179) |
| <a id="vite_srv_entrypoint"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:180](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L180) |
| <a id="app_host"></a> `APP_HOST` | `string` | Express server host | [src/types.ts:181](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L181) |
| <a id="app_port"></a> `APP_PORT` | `number` | Express server port | [src/types.ts:182](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L182) |
| <a id="app_enable_https"></a> `APP_ENABLE_HTTPS` | `boolean` | HTTPS enabled / disabled | [src/types.ts:183](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L183) |
| <a id="app_serve_bundle"></a> `APP_SERVE_BUNDLE` | `boolean` | Server serves react app bundle at / | [src/types.ts:184](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L184) |
| <a id="app_bundle_dir"></a> `APP_BUNDLE_DIR` | `string` | React app bundle directory | [src/types.ts:185](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L185) |
| <a id="app_max_upload_size"></a> `APP_MAX_UPLOAD_SIZE` | `number` | Max size allowed for uploads | [src/types.ts:186](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L186) |
| <a id="app_keypair_alg"></a> `APP_KEYPAIR_ALG` | `string` | The key pair algorithm. | [src/types.ts:187](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L187) |
| <a id="app_cookie_name"></a> `APP_COOKIE_NAME` | `string` | Cookie holding the JWT | [src/types.ts:188](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L188) |
| <a id="app_token_validity"></a> `APP_TOKEN_VALIDITY` | `number` | JWT validity duration in seconds | [src/types.ts:189](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L189) |
| <a id="app_tls_options"></a> `APP_TLS_OPTIONS` | `ServerOptions` | Server TLS configuration options | [src/types.ts:190](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L190) |

***

### FrontendConfigSignature

Defined in: [src/types.ts:203](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L203)

Configuration type for the react client app.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="base_url"></a> `BASE_URL` | `string` | ??? | [src/types.ts:204](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L204) |
| <a id="mode"></a> `MODE` | `string` | Run the app in development or production mode | [src/types.ts:205](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L205) |
| <a id="vite_host"></a> `VITE_HOST` | `string` | Vite server host | [src/types.ts:206](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L206) |
| <a id="vite_port"></a> `VITE_PORT` | `number` | Vite server port | [src/types.ts:207](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L207) |
| <a id="vite_srv_entrypoint-1"></a> `VITE_SRV_ENTRYPOINT` | `string` | Server API root route | [src/types.ts:208](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L208) |

## Domain types

- Types for feature oriented objects from the domain layer.

### FakeMessage

```ts
type FakeMessage = {
  event: string;
  data?: unknown;
};
```

Defined in: [src/types.ts:220](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L220)

Mock message objects.

#### Properties

##### event

```ts
event: string;
```

Defined in: [src/parsers.ts:68](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L68)

##### data?

```ts
optional data: unknown;
```

Defined in: [src/parsers.ts:69](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L69)

***

### SampleData

```ts
type SampleData = {
  data: string;
  timestamp: number;
};
```

Defined in: [src/types.ts:227](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L227)

Sample data objects.

#### Properties

##### data

```ts
data: string;
```

Defined in: [src/parsers.ts:57](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L57)

##### timestamp

```ts
timestamp: number;
```

Defined in: [src/parsers.ts:58](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L58)

## React types

- Types for react component props static typing in the frontend packages.

### ResourceFetchingSignature

Defined in: [src/types.ts:238](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L238)

"Resource fetching" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content"></a> `content` | \{ `data`: `string`; `timestamp`: `number`; \} | [src/types.ts:239](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L239) |
| `content.data` | `string` | [src/parsers.ts:57](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L57) |
| `content.timestamp` | `number` | [src/parsers.ts:58](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L58) |

***

### WebTokensSignature

Defined in: [src/types.ts:247](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L247)

"Web tokens" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="protectedcontent"></a> `protectedContent` | `string` | [src/types.ts:248](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L248) |

***

### ModuleBundlingSignature

Defined in: [src/types.ts:256](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L256)

"Module bundling" component props type.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="pepe"></a> `pepe` | `string` | [src/types.ts:257](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/types.ts#L257) |
