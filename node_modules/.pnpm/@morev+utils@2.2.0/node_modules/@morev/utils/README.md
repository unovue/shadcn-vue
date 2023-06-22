![Promo image of @morev/utils package](./.github/images/banner.svg)

![Stability of "master" branch](https://img.shields.io/github/actions/workflow/status/MorevM/utils/build.yaml?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/utils)
![Release version](https://img.shields.io/github/v/release/morevm/utils?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/utils)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/utils)

# @morev/utils

100+ fully typed JavaScript utilities for everyday use. \
100+ TypeScript utility types.

---

> **IMPORTANT:** The library is not transpiled.
>
> By keep transpiling libraries we push web backward with legacy code which is unneeded for most of the users.
>
> If you need to support legacy users, you can optionally transpile the library in your build pipeline.

## Installation

```bash
# Using `yarn`
yarn add @morev/utils

# Using `npm`
npm install @morev/utils

# Using `pnpm`
pnpm add @morev/utils
```

## Usage

Just import/require needed utilities/types and use them :)

```ts
import { clamp } from '@morev/utils';
import type { ArrayOf } from '@morev/utils';

// CJS
const { arrayShuffle } = require('@morev/utils');
```

## Acknowledgments

* [fast-copy](https://github.com/planttheidea/fast-copy) for `deepClone` and `deepCloneStrict` utilities;
* [fast-equals](https://github.com/planttheidea/fast-equals) for `deepEqual` and `deepEqualCircular` utilities;
* [ohash](https://github.com/unjs/ohash) for `hash` utility;
* [type-fest](https://github.com/sindresorhus/type-fest) for many utility types.
