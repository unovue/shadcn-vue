# destr

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

## Usage

### Node.js

Install dependency:

```bash
# npm
npm i destr

# yarn
yarn add destr

# pnpm
pnpm i destr
```

Import into your Node.js project:

```js
// ESM
import { destr, safeDestr } from "destr";

// CommonJS
const { destr, safeDestr } = require("destr");
```

### Deno

```js
import { destr, safeDestr } from "https://deno.land/x/destr/src/index.ts";

console.log(destr('{ "deno": "yay" }'));
```

## Why?

### ✅ Type Safe

```ts
const obj = JSON.parse("{}"); // obj type is any

const obj = destr("{}"); // obj type is unknown by default

const obj = destr<MyInterface>("{}"); // obj is well-typed
```

### ✅ Fast fallback to input if is not string

> 🚀 Up to 500 faster than `JSON.parse`!

```js
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse();

// undefined
destr();
```

### ✅ Fast lookup for known string values

> 🚀 Up to 900 times faster than `JSON.parse`!

```js
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse("TRUE");

// true
destr("TRUE");
```

### ✅ Fallback to original value if parse fails (empty or any plain string)

> 🚀 Up to 900 times faster than `JSON.parse`!

```js
// Uncaught SyntaxError: Unexpected token s in JSON at position 0
JSON.parse("salam");

// "salam"
destr("salam");
```

**Note:** This fails in safe/strict mode with `safeDestr`.

### ✅ Avoid prototype pollution

```js
const input = '{ "user": { "__proto__": { "isAdmin": true } } }';

// { user: { __proto__: { isAdmin: true } } }
JSON.parse(input);

// { user: {} }
destr(input);
```

### ✅ Strict Mode

When using `safeDestr` it will throw an error if the input is not a valid JSON string or parsing fails. (non string values and built-ins will be still returned as-is)

```js
// Returns "[foo"
safeDestr("[foo");

// Throws an error
safeDestr("[foo", { strict: true });
```

## Benchmarks

Locally try with `pnpm benchmark`. Below are esults on Node.js **v18.16.0** with MBA M2.

**Note** `destr` is sometimes little bit slower than `JSON.parse` when parsing a valid JSON string mainly because of transform to avoid [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/) which can lead to serious security issues if not being sanitized. In the other words, `destr` is better when input is not always a json string or from untrusted source like request body.

```
=== Non-string fallback ==
JSON.parse x 9,498,532 ops/sec ±0.57% (96 runs sampled)
destr x 153,323,211 ops/sec ±0.13% (99 runs sampled)
safeDestr x 64,237,062 ops/sec ±0.22% (96 runs sampled)
sjson:
@hapi/bourne x 9,190,459 ops/sec ±0.50% (93 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 14,260,909 ops/sec ±0.54% (95 runs sampled)
destr x 72,916,945 ops/sec ±0.15% (98 runs sampled)
safeDestr x 36,544,906 ops/sec ±0.31% (98 runs sampled)
sjson x 11,157,730 ops/sec ±0.53% (96 runs sampled)
@hapi/bourne x 13,241,853 ops/sec ±0.73% (93 runs sampled)
Fastest is destr

=== plain string ==
JSON.parse (try-catch) x 10,603,912 ops/sec ±0.75% (91 runs sampled)
destr x 82,123,481 ops/sec ±2.37% (99 runs sampled)
safeDestr x 40,737,935 ops/sec ±0.97% (96 runs sampled)
sjson (try-catch) x 9,194,305 ops/sec ±1.96% (94 runs sampled)
@hapi/bourne x 10,816,232 ops/sec ±1.59% (90 runs sampled)
Fastest is destr

=== package.json ==
JSON.parse x 403,428 ops/sec ±0.31% (101 runs sampled)
destr x 338,668 ops/sec ±0.27% (97 runs sampled)
safeDestr x 335,756 ops/sec ±0.29% (98 runs sampled)
sjson x 355,493 ops/sec ±0.15% (101 runs sampled)
@hapi/bourne x 384,948 ops/sec ±0.24% (98 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 406,262 ops/sec ±0.18% (100 runs sampled)
destr x 337,602 ops/sec ±0.37% (99 runs sampled)
safeDestr x 320,071 ops/sec ±0.35% (97 runs sampled)
sjson (try-catch) x 326,689 ops/sec ±0.41% (97 runs sampled)
@hapi/bourne x 313,024 ops/sec ±0.91% (94 runs sampled)
Fastest is JSON.parse (try-catch)
```

## License

MIT. Made with 💖

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/destr?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/destr
[npm-downloads-src]: https://img.shields.io/npm/dm/destr?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/destr
[bundle-src]: https://img.shields.io/bundlephobia/minzip/destr?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=destr
[license-src]: https://img.shields.io/github/license/unjs/destr.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/destr/blob/main/LICENSE
