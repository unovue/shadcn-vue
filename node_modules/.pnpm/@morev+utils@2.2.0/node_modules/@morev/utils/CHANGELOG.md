

## [2.2.0](https://github.com/MorevM/utils/compare/v2.1.0...v2.2.0) (2023-06-13)


### Features

* **arrays:** Add `arrayRemove` and `arrayRemoveMutable` utilities ([e2f003d](https://github.com/MorevM/utils/commit/e2f003d078d08134c3adbe242bd33983645151e5))
* **promises:** Add `minTimePromise` utility ([f49726d](https://github.com/MorevM/utils/commit/f49726d0466409c6fcff30c10025b82693d6ccf3))
* **types:** Add new types from `type-fest` ([ac1185c](https://github.com/MorevM/utils/commit/ac1185c11e074e92e9e540a0f4160885c076aa8e))


### Chores

* Bump `type-fest` from 3.10.0 to 3.11.1 ([1aab16c](https://github.com/MorevM/utils/commit/1aab16c08f7c90e96afe8551b1003927db9aa54e))


## [2.1.0](https://github.com/MorevM/utils/compare/v2.0.5...v2.1.0) (2023-05-07)


### Features

* **dom:** Add `setStyleProperties` utility ([f3cbbaf](https://github.com/MorevM/utils/commit/f3cbbafebd1c0ad1f6324976d361c478c211eba7))
* **typescript:** Add newly added type utilities of `type-fest` ([823242f](https://github.com/MorevM/utils/commit/823242f629d821c02f4d8b2cd43478701ffec2c7))


### Refactoring

* Prefer named imports for `fast-copy` lib because of incorrect CJS transformation ([ea1397e](https://github.com/MorevM/utils/commit/ea1397e5d9e3c6d2005fcf6842349f88c5e420db))


### Bug fixes

* Provide a CJS files with `.cjs` extension ([e884c83](https://github.com/MorevM/utils/commit/e884c831bcd39bf7bbfae34c28b44ac851755ff1))


### Chores

* Bump `ohash` from 1.0.0 to 1.1.2 ([e352b51](https://github.com/MorevM/utils/commit/e352b51f77691233b92dbc899fb1d4c0d5e9a543))
* Bump `type-fest` from 3.8.0 to 3.10.0 ([88eca40](https://github.com/MorevM/utils/commit/88eca40962e1103b5764fbb179210ce0e2d753b9))
* bump fast-copy from 3.0.0 to 3.0.1 ([#121](https://github.com/MorevM/utils/issues/121)) ([68ef640](https://github.com/MorevM/utils/commit/68ef640bcaa69c98be41c0f86e8af9cc927da01b))
* bump fast-equals from 4.0.3 to 5.0.1 ([ed35e43](https://github.com/MorevM/utils/commit/ed35e43a23ed2d3ae1b15f03e6e2fcca0687339e))
* bump type-fest from 3.5.5 to 3.8.0 ([6492bed](https://github.com/MorevM/utils/commit/6492bed3e6f71331b24191e5f2266d43d72a1590))

### [2.0.5](https://github.com/MorevM/utils/compare/v2.0.4...v2.0.5) (2023-02-07)


### Bug fixes

* **guards:** Make `isArray` generic ([dfba502](https://github.com/MorevM/utils/commit/dfba502b92b036b4b8be03bb8bac34f2b1e786e2))
* Set default generic value of some utilities to `any` instead of `unknown` ([d841e72](https://github.com/MorevM/utils/commit/d841e72950d63b2ff27cdeb7299ed1beb377ad80))


### Chores

* Upgrade `type-fest` from 3.5.4 to 3.5.5 ([e319e00](https://github.com/MorevM/utils/commit/e319e00fb3b843c9937651f2d550434c663a33a3))

### [2.0.4](https://github.com/MorevM/utils/compare/v2.0.3...v2.0.4) (2023-02-02)


### Bug fixes

* Soften some types from `unknown` to `any` ([e99d730](https://github.com/MorevM/utils/commit/e99d7301ba2366982a1b6496c31cd268d1236260))


### Chores

* bump type-fest from 3.5.2 to 3.5.4 ([dcee056](https://github.com/MorevM/utils/commit/dcee0565a0509a0cc0c8c8a13b846f1da23a1384))

### [2.0.3](https://github.com/MorevM/utils/compare/v2.0.2...v2.0.3) (2023-01-17)


### Chores

* Mark the package as ESM with `type: "module"` ([cf39753](https://github.com/MorevM/utils/commit/cf3975302c20d8c8a2b2ca5be4a863ade3e65ec9))

### [2.0.2](https://github.com/MorevM/utils/compare/v2.0.1...v2.0.2) (2023-01-17)


### Chores

* bump type-fest from 3.5.0 to 3.5.2 ([5d03b49](https://github.com/MorevM/utils/commit/5d03b49ff3d4c08eb1f07bc7c6aa0e19a84f33cd))
* Change the extension of build files ([b24b6cc](https://github.com/MorevM/utils/commit/b24b6ccde25474d66b633be023416f2a77421595))
* Upgrade devDeps ([3dc2f11](https://github.com/MorevM/utils/commit/3dc2f11808a5705ca39e1ea2671a429f07ed65ed))

### [2.0.1](https://github.com/MorevM/utils/compare/v2.0.0...v2.0.1) (2023-01-03)


### Bug fixes

* **ranges:** Mark range arguments as `readonly` ([b33c38b](https://github.com/MorevM/utils/commit/b33c38b48cc77478212286d855153f433141b20a))
* **ranges:** Strip `undefined` from return values ([860830d](https://github.com/MorevM/utils/commit/860830db7c7763d5306f5073cd32e47adb1261cb))

## [2.0.0](https://github.com/MorevM/utils/compare/v1.19.2...v2.0.0) (2022-12-31)


### ⚠ BREAKING CHANGES

* The package has been renamed from `@morev/helpers` to `@morev/utils`
* The package is no longer transpiled. If you need to support a legacy environment, transpile the library on your side.
* **types:** Some of existed TS types have been replaced with their `type-fest` analogues. \
  While they should continue to work as before, potentially there can be a changes in these types: `Class`, `Constructor`, `Except`, `ElementOf`, `LiteralUnion`, `Merge`, `Primitive`, `Awaitable`, `PartialOptional`, `PartialRequired`.
* Utility `inRange` was removed for better naming consistency accross the groups. \
  Use `rangeIncludes` instead. Note that the function signature has been slightly changed.
* Named exports such as `@morev/helpers/types`, `@morev/helpers/arrays` are no longer available. Make sure you import utilities from the package root.

### Features

* **functions:** Add `assert` utility ([3f9dccc](https://github.com/MorevM/utils/commit/3f9dccc50fb829ebf761baa55ed4017c3606ed86))
* **ranges:** Support `undefined` type of `ranges` argument ([334e020](https://github.com/MorevM/utils/commit/334e020d054becb9ee477384c1884f8de7545fca))
* **strings:** Utility `unquote` should handle backticks as well ([9b37f94](https://github.com/MorevM/utils/commit/9b37f94073769a74cd4e6be3e7164c12d3d37ed6))
* **types:** Add/replace a lot of types with `type-fest` ([2fc25ae](https://github.com/MorevM/utils/commit/2fc25aedc9b03cf634ed6bc67ae96708ac74799f))


### Bug fixes

* Make `isDev` and `isProd` safe for client-side code ([4a3e9bb](https://github.com/MorevM/utils/commit/4a3e9bbf9c00d18524dd8aa19a885aaed5c8bc1e))


### Documentation

* **guards:** JSDoc for `isIterable` utility ([2e04df3](https://github.com/MorevM/utils/commit/2e04df35bd1459f20397c56ebb6e8b2502d9e683))
* **ranges:** Add missed JSDoc to methods in the `range` category ([0b7cbb7](https://github.com/MorevM/utils/commit/0b7cbb730f3ad3b3bb1d1a9a8b58cda7af3b03ad))


### Chores

* Add `README.md` boilerplate ([7c020ad](https://github.com/MorevM/utils/commit/7c020ad364b2ea3b7626514306b384ce75633e26))
* Remove the package exports except root ([645619a](https://github.com/MorevM/utils/commit/645619a1ff6c82fdf634ddd7c2faa2dd1b688dbb))
* Rename the package from `@morev/helpers` to `@morev/utils` ([7ed87b5](https://github.com/MorevM/utils/commit/7ed87b5a4c3e9288fe2fbc9b075855a5d9db4a9d))
* Set `target` to `esnext` ([9d3bdd1](https://github.com/MorevM/utils/commit/9d3bdd1b7d1c9455be77c7fc48a8152a588596d3))


### Refactoring

* Remove `inRange` utility (replaced with `rangeIncludes`) ([dc7d477](https://github.com/MorevM/utils/commit/dc7d47791b8074dba2889a4474d92f4bf892fe47))

### [1.19.2](https://github.com/MorevM/utils/compare/v1.19.1...v1.19.2) (2022-12-17)


### Bug fixes

* **typescript:** Return type of `tsObject.keys` ([470c747](https://github.com/MorevM/utils/commit/470c74792ca89250c49bca4d758690cdf2830e46))


### [1.19.1](https://github.com/MorevM/utils/compare/v1.19.0...v1.19.1) (2022-12-11)


### Bug fixes

* **types:** Add missing `ObjectFromEntries` export ([78c7bb3](https://github.com/MorevM/utils/commit/78c7bb3783ae75c4a2acfe263f7c0494782c0565))

## [1.19.0](https://github.com/MorevM/utils/compare/v1.18.1...v1.19.0) (2022-12-11)


### Features

* **types:** Add `ObjectFromEntries` type and corresponding `tsObject` mapping ([94b52ea](https://github.com/MorevM/utils/commit/94b52eae4f1999fc9d29b802226a1f4afb5ffa8f))


### Bug fixes

* **types:** Improve typings for `tsObject` methods ([5451e23](https://github.com/MorevM/utils/commit/5451e239157128b6015fca68b12e39c4d173b392))

### [1.18.1](https://github.com/MorevM/utils/compare/v1.18.0...v1.18.1) (2022-12-11)


### Bug fixes

* **objects:** Better typings for `deepClone` utility ([fca506c](https://github.com/MorevM/utils/commit/fca506c136dbb67be0443283b2c4380d6948cd1f))


## [1.18.0](https://github.com/MorevM/utils/compare/v1.17.0...v1.18.0) (2022-12-06)


### Features

* **arrays:** Add `arraySample` utility ([27fbc61](https://github.com/MorevM/utils/commit/27fbc611892d608f44faabf018fc7f69231046b5))
* **functions:** Replace string `hash` utility to `ohash` lib processing any JS value ([489772a](https://github.com/MorevM/utils/commit/489772af3f226dd16cc436e26ccd929ead9c275b))


### Chores

* Upgrade devDeps ([697c37d](https://github.com/MorevM/utils/commit/697c37d981ddbf435fd9ba0ee7f8dac537a5d2b0))

## [1.17.0](https://github.com/MorevM/utils/compare/v1.16.0...v1.17.0) (2022-12-02)


### Features

* **arrays:** Add `arrayInsert` utility ([5e89760](https://github.com/MorevM/utils/commit/5e897600f559fa5358f77d84e56dae9cbb7bb56d))
* **arrays:** Add `arrayOfLength` utility ([b3c5402](https://github.com/MorevM/utils/commit/b3c5402e7f667272f9dd90b6081a3d37a27f07aa))
* **types:** Add `Merge` type ([90b288b](https://github.com/MorevM/utils/commit/90b288b9317dc2a214d9e504c05083e5456bd4f8))

## [1.16.0](https://github.com/MorevM/utils/compare/v1.15.0...v1.16.0) (2022-11-27)


### Features

* **guards:** Add `isIterable` utility ([8429259](https://github.com/MorevM/utils/commit/84292599bab413d1519dc49d35a26bca1b3f4a4b))
* **guards:** Add `isMap` utility ([1608271](https://github.com/MorevM/utils/commit/16082711b7aeca057cd19fd6204c93f300f275b0))
* **guards:** Add `isPrimitive` utility ([16bbf87](https://github.com/MorevM/utils/commit/16bbf87551d4986d7bc31afcc12ffb9d94ac32d9))
* **guards:** Add `isWeakMap` utility ([9e3b58a](https://github.com/MorevM/utils/commit/9e3b58ab8332953cff0d5b040d201975669fdb74))
* **object:** Add `deepClone` and `deepCloneStrict` utilities ([c57114d](https://github.com/MorevM/utils/commit/c57114d139af70d004099712fe4e60226bf30fdf))
* **objects:** Extend `deepEqual` to support `Map / Set`, add `deepEqualCircular` utility ([ef37fc7](https://github.com/MorevM/utils/commit/ef37fc7be8b124694cb5e81af7a9a5496a780634))

### Bug fixes

* **guards:** Take account of Nodelist, HTMLCollection and (Weak)Map/Sets in `isEmpty` utility ([7580a3b](https://github.com/MorevM/utils/commit/7580a3b76f80fb50228b0ba5e99bfd121a5c5698))


## [1.15.0](https://github.com/MorevM/utils/compare/v1.14.0...v1.15.0) (2022-11-24)


### Features

* **numbers:** Allow string input for `numberFormat`, add fallback to zero in case of wrong input ([f6a6f1d](https://github.com/MorevM/utils/commit/f6a6f1d9b4d83981bb8e6e6da27136b5cc6c13df))


### Bug fixes

* **numbers:** Set non-breaking space as default separator between thousands ([1e83f1b](https://github.com/MorevM/utils/commit/1e83f1b5b16b36e6dc4d0a9c9234206c46887a38))

## [1.14.0](https://github.com/MorevM/utils/compare/v1.13.0...v1.14.0) (2022-11-22)


### Features

* **objects:** Add `objectGet` utility ([f7256b7](https://github.com/MorevM/utils/commit/f7256b720a905fbd3ae7b0d209284d21631a9a75))
* **objects:** Add `tsObject` utility ([1575323](https://github.com/MorevM/utils/commit/15753234e06e4dd91cced337521862c4937c9c90))


### Bug fixes

* **types:** ObjectValues returns an Array of values ([9b3b6b1](https://github.com/MorevM/utils/commit/9b3b6b184ec1ac131e02a3120aa614dceb35ddbb))

## [1.13.0](https://github.com/MorevM/utils/compare/v1.12.1...v1.13.0) (2022-10-29)


### Features

* **numbers:** Allow to use `clamp` with only lower / upper bound ([2716c3e](https://github.com/MorevM/utils/commit/2716c3ef0e73876eda7da55dd1f9d1d96b3f01cb))


### [1.12.1](https://github.com/MorevM/utils/compare/v1.12.0...v1.12.1) (2022-10-27)

### Bug fixes

* **numbers:** Arguments of `randomInteger` are optional now ([7a8dfa3](https://github.com/MorevM/utils/commit/7a8dfa3aaa3f65387b0e4250ce4181e342ce539c))


## [1.12.0](https://github.com/MorevM/utils/compare/v1.11.0...v1.12.0) (2022-10-13)


### Features

* **dom:** Add `getScrollbarWidth` utility ([01ec25d](https://github.com/MorevM/utils/commit/01ec25dafe52c4b4c77d49b45269bb144c2fc5f0))
* **types:** Add `LiteralUnion` utility ([11ef568](https://github.com/MorevM/utils/commit/11ef568384d21af74fcdac2f651c69405792aa08))


### Chores

* Upgrade devDeps ([529d8e5](https://github.com/MorevM/utils/commit/529d8e54e9b592c8f0329a587c037669cf609282))

## [1.11.0](https://github.com/MorevM/utils/compare/v1.10.1...v1.11.0) (2022-10-07)


### Features

* **types:** Add `ObjectValues` and `ObjectEntries` types ([62171b3](https://github.com/MorevM/utils/commit/62171b3ef0a990d17ff6c8e79d709c752b354770))

### [1.10.1](https://github.com/MorevM/utils/compare/v1.10.0...v1.10.1) (2022-10-06)


### Bug fixes

* **ranges:** Add missed `rangesInvert` and `rangeIncludes` exports ([5204699](https://github.com/MorevM/utils/commit/520469981b3339e6ed1c5e51eb2847fb07e938c9))

## [1.10.0](https://github.com/MorevM/utils/compare/v1.9.1...v1.10.0) (2022-10-04)


### Features

* **types:** Add `Except` type ([46b0b39](https://github.com/MorevM/utils/commit/46b0b39e437325175663b7e7cce6faf3d1a04494))
* **types:** Add `IsEqual` utility type ([ad6c0bc](https://github.com/MorevM/utils/commit/ad6c0bc60b9271d00fd68671cb385bf5de51cf80))


### Bug fixes

* **types:** Use `Except` instead of `Omit` in `PartialOptional` and `PartialRequired` ([32e1f69](https://github.com/MorevM/utils/commit/32e1f690c5dfd5c21cad637acb3693902a031ffd))

### [1.9.1](https://github.com/MorevM/utils/compare/v1.9.0...v1.9.1) (2022-09-28)


### Bug fixes

* **environment:** Drop `cjsVariables` utility ([c90f4c4](https://github.com/MorevM/utils/commit/c90f4c4415152a38383f7d444db181d3ff286a4e))

## [1.9.0](https://github.com/MorevM/utils/compare/v1.8.0...v1.9.0) (2022-09-25)


### Features

* **environment:** Add `cjsVariables` utility ([1f9f203](https://github.com/MorevM/utils/commit/1f9f203a72031bfc4a9fa325288868b9870327ce))
* **environment:** Add `isDev`, `isProp`, `isTest` utilities ([8ff3678](https://github.com/MorevM/utils/commit/8ff3678ab7b7c8a1a51ef0975304dc0859029977))
* **functions:** Add `throttle` utility ([af021e3](https://github.com/MorevM/utils/commit/af021e3b3464a44dc09f148defdf890188dad5f2))
* **numbers:** Add `toNumber` utility ([3540ead](https://github.com/MorevM/utils/commit/3540eadffdebf56745a7a55daf6065bdbf1aee53))
* **ranges:** Add `rangeIncludes` utility ([1bb4a1c](https://github.com/MorevM/utils/commit/1bb4a1c6fcafbbc90afd0684f353f4aaed3806b5))
* **ranges:** Add `rangesCrop` utility ([b65ebc2](https://github.com/MorevM/utils/commit/b65ebc22e51f399cb3e9104b9cac04d6f26a9887))
* **ranges:** Add `rangesInvert` utility ([d7e6b8b](https://github.com/MorevM/utils/commit/d7e6b8b356d4543762661981ee0c4b4548fa830b))
* **types:** Add `MathAdd`, `MathSubtract` and `NumberRange` types ([1a075d3](https://github.com/MorevM/utils/commit/1a075d3cc47d166378588af10bea6e1be3a906bc))


### Refactoring

* **numbers:** Deprecate `inRange` utility ([ccd7567](https://github.com/MorevM/utils/commit/ccd756717924d8361a1ab5d1fc12ca45b6cc24cb))
* **ranges:** Consistent type of `Range` across all utilities ([4ace6da](https://github.com/MorevM/utils/commit/4ace6daf4b360726c28aa09e3078129290350a5d))
* **types:** Put types in semantic groups ([eab149d](https://github.com/MorevM/utils/commit/eab149dd2369192642d1d6e939229200fce0486b))
* **types:** Rename `TrimLeft / TrimRight` to `TrimStart / TrimEnd` ([025be95](https://github.com/MorevM/utils/commit/025be958dcb3d666482db4a16c536b2833bd2398))


### Chores

* bump @morev/eslint-config from 17.2.1 to 17.3.1 ([2090f2b](https://github.com/MorevM/utils/commit/2090f2b85b98dc48051ed30275c83956ea1093a1))
* bump eslint from 8.23.1 to 8.24.0 ([2fc6305](https://github.com/MorevM/utils/commit/2fc630522f69c8bbd0170bd11d471225b873b77f))
* bump ts-jest from 29.0.1 to 29.0.2 ([2d4b9b0](https://github.com/MorevM/utils/commit/2d4b9b03ca608df2f8131e685567071daaf74c00))

## [1.8.0](https://github.com/MorevM/utils/compare/v1.7.0...v1.8.0) (2022-09-24)


### Features

* **types:** Add `Trim`, `TrimLeft`, `TrimRight` types ([e032a58](https://github.com/MorevM/utils/commit/e032a58c726bc9be30780f6e891c78727a9101a0))

## [1.7.0](https://github.com/MorevM/utils/compare/v1.6.0...v1.7.0) (2022-09-19)


### Features

* **guards:** Add `isSymbol` utility ([b1d15b3](https://github.com/MorevM/utils/commit/b1d15b3d10c33f8de7835b1d1ff8e942480df397))
* **strings:** Add `numbers` option to `kebab-case` ([9bb8429](https://github.com/MorevM/utils/commit/9bb84297d1175bb3e4bb1230af90334e415dfc83))
* **types:** Add `Builtin` type ([a06d752](https://github.com/MorevM/utils/commit/a06d7529b81e7bd11b1c5dcd91237602cc86b425))
* **types:** Add `Primitive` type ([aadcc35](https://github.com/MorevM/utils/commit/aadcc35d0afa04e49f7a8352e3c4ac3c838021aa))


### Refactoring

* Consistent test group names ([1036bed](https://github.com/MorevM/utils/commit/1036bedba80b8f9c1e72c71b048b5eca560879c2))


### Bug fixes

* **ranges:** Return an empty array for invalid input in `rangesSort` ([06dbada](https://github.com/MorevM/utils/commit/06dbada31cd6c0a95a6ba045577df8c986335a53))


### Chores

* bump @morev/eslint-config from 17.1.1 to 17.2.1 ([61ad3b0](https://github.com/MorevM/utils/commit/61ad3b071f47c36b3f8e81954ea6b11ba1deef68))

## [1.6.0](https://github.com/MorevM/utils/compare/v1.5.0...v1.6.0) (2022-09-18)


### Features

* **strings:** Add `escapeRegExp` utility ([041905e](https://github.com/MorevM/utils/commit/041905eeafe8c3a2940282781a642e34e0decef3))
* **types:** Add `Class` type ([a824428](https://github.com/MorevM/utils/commit/a82442849d8ed87853784cf010247bbf0ace9432))
* **types:** Add `Constructor` type ([6e3bd14](https://github.com/MorevM/utils/commit/6e3bd14e0a2e53cacbf21d7585e4ba70a973e7e7))
* **types:** Add `Explicit` type ([a785b45](https://github.com/MorevM/utils/commit/a785b451f9f2e34dd2f33745d4c466b107d85748))
* **types:** Add `PartialRequired` and `PartialOptional` types ([292ef8d](https://github.com/MorevM/utils/commit/292ef8d80b74e57dfab5520700f8120283074e26))


### Refactoring

* **types:** Consistent generic name in `StartsWith/EndsWith` ([78baac7](https://github.com/MorevM/utils/commit/78baac745cef71fef609a3522fe77d94c5982af9))


### Bug fixes

* Actualize named exports ([30186e1](https://github.com/MorevM/utils/commit/30186e1dc88aeda1f2ed5d2c64849b956e84b209))

## [1.5.0](https://github.com/MorevM/utils/compare/v1.4.2...v1.5.0) (2022-09-17)


### Features

* **types:** Add `StartsWith` and `EndsWith` utility types ([32735e9](https://github.com/MorevM/utils/commit/32735e90d52a72e75e105fa71f45104ac363a7fe))


### Chores

* bump eslint from 8.23.0 to 8.23.1 ([#105](https://github.com/MorevM/utils/issues/105)) ([05f271c](https://github.com/MorevM/utils/commit/05f271c1fdef645dac34509519163573d70ee867))
* bump jest and @types/jest ([#103](https://github.com/MorevM/utils/issues/103)) ([73cfa00](https://github.com/MorevM/utils/commit/73cfa00d694287d7dbc422cb06c087890fee96a8))
* bump jest-environment-jsdom from 29.0.2 to 29.0.3 ([#104](https://github.com/MorevM/utils/issues/104)) ([3f3469d](https://github.com/MorevM/utils/commit/3f3469d0f05e9e64d541842093b87c36b84cd5a2))
* bump release-it from 15.4.1 to 15.4.2 ([#107](https://github.com/MorevM/utils/issues/107)) ([8228cba](https://github.com/MorevM/utils/commit/8228cbaa7920bfc0b0193851864ab05a9b80bf59))
* bump ts-jest from 29.0.0 to 29.0.1 ([#106](https://github.com/MorevM/utils/issues/106)) ([8f213a8](https://github.com/MorevM/utils/commit/8f213a8d4f9923c6d4798d280664fc11a0efc546))

### [1.4.2](https://github.com/MorevM/utils/compare/v1.4.1...v1.4.2) (2022-09-10)


### Chores

* bump @morev/eslint-config from 16.0.0 to 17.1.1 ([83efa18](https://github.com/MorevM/utils/commit/83efa1880bf76d817d7715bbbe4f12019b6c1f54))
* bump jest from 29.0.1 to 29.0.2 ([#99](https://github.com/MorevM/utils/issues/99)) ([1923751](https://github.com/MorevM/utils/commit/19237513b4c7a9fecfeb85a819ee4e173ff1f5f6))
* bump jest-environment-jsdom from 29.0.1 to 29.0.2 ([#101](https://github.com/MorevM/utils/issues/101)) ([b2a51ac](https://github.com/MorevM/utils/commit/b2a51acaa44616a11996afbf793a5d01946c250d))
* bump ts-jest from 28.0.8 to 29.0.0 ([#98](https://github.com/MorevM/utils/issues/98)) ([1cbcb57](https://github.com/MorevM/utils/commit/1cbcb57461c29c7b061cbf9c24292e6b8a216bda))
* bump typescript from 4.8.2 to 4.8.3 ([#100](https://github.com/MorevM/utils/issues/100)) ([9ddfa6b](https://github.com/MorevM/utils/commit/9ddfa6b52843e7982913498db871cdcf6eff7be3))
* Disable `yml/file-extension` for `.github` folder ([c6cfdd6](https://github.com/MorevM/utils/commit/c6cfdd651c95114d52c2d298709e1bd8f816f8af))


### Refactoring

* **environment:** Sort `isMobile` regex ([14df57d](https://github.com/MorevM/utils/commit/14df57d0386c8bc40c8a24c386d240c4a836eae0))
* **environment:** Sort `isOSX` regex ([13a5e76](https://github.com/MorevM/utils/commit/13a5e7601decadbdafbdbe3f873a2e790e14a61a))
* Fix some more regexps after linter update ([14c08be](https://github.com/MorevM/utils/commit/14c08be0059091031b5b3d944c598607cf0df6a4))

### [1.4.1](https://github.com/MorevM/utils/compare/v1.4.0...v1.4.1) (2022-09-09)


### Refactoring

* **dom:** Make `axis` argument optional for `getElementOffset` ([f3f84f2](https://github.com/MorevM/utils/commit/f3f84f2e81d6d6a532ba8c13b763469d6fd9855f))

## [1.4.0](https://github.com/MorevM/utils/compare/v1.3.0...v1.4.0) (2022-09-02)


### Features

* **types:** Add `ArrayOf` type ([214f025](https://github.com/MorevM/utils/commit/214f02598d96cbbf62d8fcf4d015344d10f684fd))
* **types:** Add `ElementOf` type ([02498c3](https://github.com/MorevM/utils/commit/02498c3440de4d36ea44fe03672d00b46ba68d44))
* **types:** Add `NonEmptyArray` type ([e275060](https://github.com/MorevM/utils/commit/e275060647372b2e50a2149c8b9b216ee6d82a05))
* **types:** Add `ObjectKeys` type ([034e3db](https://github.com/MorevM/utils/commit/034e3db5de8db19b7301d5ba6eea6616cf90a91d))
* **types:** Add `PlainObject` type ([60d8d3d](https://github.com/MorevM/utils/commit/60d8d3d490d2236054696e4d63dba69caa47342e))

## [1.3.0](https://github.com/MorevM/utils/compare/v1.2.1...v1.3.0) (2022-09-02)


### Features

* **promises:** Add `promiseController` utility ([f8e3ee8](https://github.com/MorevM/utils/commit/f8e3ee80ca6bca0b8d98cf23696f935fdcf27c67))
* **types:** Add `Arrayable`, `Awaitable` and `Nullable` types ([481334f](https://github.com/MorevM/utils/commit/481334f573792fae3983b8096f54fd0627698c46))


### Chores

* bump `@morev/eslint-config` from 15.4.0 to 16.0.0 ([2886dc6](https://github.com/MorevM/utils/commit/2886dc6a2f671370f3d98ca8164eec926df792fd))
* bump `@types/jest` from 28.1.8 to 29.0.0 ([1817d8e](https://github.com/MorevM/utils/commit/1817d8e9132220239a78eb82d89b36772f62bc11))
* bump `release-it` from 15.4.0 to 15.4.1 ([4fe0917](https://github.com/MorevM/utils/commit/4fe091749197a88202ba8f9e21f16c682a331af2))

### [1.2.1](https://github.com/MorevM/utils/compare/v1.2.0...v1.2.1) (2022-08-27)


### Bug fixes

* **environment:** Add missed `isLighthouse` export ([e919a2e](https://github.com/MorevM/utils/commit/e919a2eb3eddb25bc9755122c9f350fe2d451da9))

## [1.2.0](https://github.com/MorevM/utils/compare/v1.1.0...v1.2.0) (2022-08-27)


### Features

* **environment:** Add `isLighthouse` helper ([791e68a](https://github.com/MorevM/utils/commit/791e68a436c3601f642b3767a19248fe7a2ec177))


### Chores

* All deps update ([0410f5a](https://github.com/MorevM/utils/commit/0410f5ac51c8531abcd0bc0c62bfa79e2303d48f))
* bump @release-it/conventional-changelog from 5.0.0 to 5.1.0 ([#94](https://github.com/MorevM/utils/issues/94)) ([133529a](https://github.com/MorevM/utils/commit/133529a848678af55f4f18980795ef5f44599c4a))
* bump @types/jest from 28.1.6 to 28.1.7 ([#97](https://github.com/MorevM/utils/issues/97)) ([efd16d8](https://github.com/MorevM/utils/commit/efd16d8ea60273341bec44ed00b669019f9f5a30))
* bump eslint from 8.21.0 to 8.22.0 ([#96](https://github.com/MorevM/utils/issues/96)) ([d7ec813](https://github.com/MorevM/utils/commit/d7ec81305a777218531736b21fc20928dc78f7b6))
* bump ts-jest from 28.0.7 to 28.0.8 ([#95](https://github.com/MorevM/utils/issues/95)) ([b4cb1fe](https://github.com/MorevM/utils/commit/b4cb1fefa4d9b34c0511723f2fb6724237e7ec64))

## [1.1.0](https://github.com/MorevM/utils/compare/v1.0.1...v1.1.0) (2022-08-14)


### Features

* **arrays:** Add `array-range` helper ([786bdf2](https://github.com/MorevM/utils/commit/786bdf2211317b907bc465d4a69d886d072fc72e))
* **ranges:** Add `rangesMerge` helper ([06c1546](https://github.com/MorevM/utils/commit/06c1546113628e4f98aae460d1ed1daa0404748c))
* **ranges:** Add `rangesSort` helper ([9557967](https://github.com/MorevM/utils/commit/95579675e8c1ecaa0f1622348645556d4d8855cc))
* **strings:** Add `padStart` and `padEnd` helpers ([e831f03](https://github.com/MorevM/utils/commit/e831f031bb64c4185891bb176a7a2520b7cfda5c))


### Chores

* bump @morev/eslint-config from 15.1.0 to 15.2.0 ([#89](https://github.com/MorevM/utils/issues/89)) ([5f3d82a](https://github.com/MorevM/utils/commit/5f3d82abc255752579089fdf1539a39b7c94aaa1))
* bump @morev/eslint-config from 15.2.0 to 15.3.0 ([#92](https://github.com/MorevM/utils/issues/92)) ([b6e6c65](https://github.com/MorevM/utils/commit/b6e6c65e0e48b79a7d0ef967b691c8ad436a1d1b))
* bump eslint from 8.20.0 to 8.21.0 ([#90](https://github.com/MorevM/utils/issues/90)) ([43bd9b5](https://github.com/MorevM/utils/commit/43bd9b597d054e784ddad042605c818634bfd57b))
* bump release-it from 15.1.3 to 15.2.0 ([#87](https://github.com/MorevM/utils/issues/87)) ([dfb7f54](https://github.com/MorevM/utils/commit/dfb7f54bf958dc42191adfbe7a0850843fda0129))
* bump release-it from 15.2.0 to 15.3.0 ([#93](https://github.com/MorevM/utils/issues/93)) ([a5146a9](https://github.com/MorevM/utils/commit/a5146a91fb88e7858c654ec794ce62ef6af53a8b))
* bump tsup from 6.1.3 to 6.2.1 ([#88](https://github.com/MorevM/utils/issues/88)) ([ea03e15](https://github.com/MorevM/utils/commit/ea03e15f5e25ccfbf99c6a74e3a1dbb4b0cfc04b))
* bump tsup from 6.2.1 to 6.2.2 ([#91](https://github.com/MorevM/utils/issues/91)) ([14f881f](https://github.com/MorevM/utils/commit/14f881f0eb66ebfd7d3d3301e6ebbc7041fdb746))
* Disable `strictNullChecks` and `noImplicitAny` compiler options ([225006a](https://github.com/MorevM/utils/commit/225006a3b1f6704bebf50f1e36c0708a33fd988c))
* Update `tsconfig.json` to use `ts-node` with ESM ([069bbd1](https://github.com/MorevM/utils/commit/069bbd1e3af2120bb64e5781d8d0a570accf8205))


### Refactoring

* Suppress linter/compiler errors after editing of `tsconfig.json` ([de28c0d](https://github.com/MorevM/utils/commit/de28c0d7b385312595b929e012d85501ca63f4d9))

### [1.0.1](https://github.com/MorevM/utils/compare/v1.0.0...v1.0.1) (2022-07-24)

Just version bump due to unsuccessful release.

## [1.0.0](https://github.com/MorevM/utils/compare/v0.21.0...v1.0.0) (2022-07-24)

### ⚠ BREAKING CHANGES

* `defaults` helper has been renamed to `mergeObjects`.
* **dom:** Return value for functions `getElementOffset` and `getWindowScroll` using `axis` argument with value `both` has been changed: now it returns object of type `{ x: number; y: number }` instead of `{ top: number, left: number }`
* Helper `hyphenate` has been renamed to `kebabCase` with the same functionality.
* Helper `isObjectsEqualJson` no longer exists. Use `deepEqual` instead.
* `compose`, `debounce`, `noop` and `sleep` has been moved to new category `./functions`.
* Exports was renamed: `./browser` → `./environment`
* Exports was renamed: `./types` → `./guards`
* Exports `./utils` no longer exists.
* Helper `isEmail` has been moved from `./strings` to `./guards` category.
* Helper `isNode` previously works the same as `isElement` works now. Now the function name corresponds to its logic.

### Features

* **dates:** Add category `dates` and `daysInMonth` helper ([93bf9b0](https://github.com/MorevM/utils/commit/93bf9b07a27daabbebf50bb93160ede1d47e8ff3))
* **dom:** Make `axis` argument optional for `getDocumentSize` ([e202a41](https://github.com/MorevM/utils/commit/e202a41d8c5a77efbbc8474baee14230caf4db0a))
* **dom:** Make `axis` argument optional for `getScrollLimit` ([2ed1743](https://github.com/MorevM/utils/commit/2ed1743a7e00fb3e32cc3615543c38f07f182d03))
* **dom:** Make `axis` argument optional for `getWindowScroll` ([a3bb130](https://github.com/MorevM/utils/commit/a3bb1305e51dd1ebfb1923e8f6cf763d9d5ab20c))
* **environment:** Add `isServer` and `isClient` helpers ([a47f1de](https://github.com/MorevM/utils/commit/a47f1de745b10a69c761efbe158d30241bf7f401))
* **numbers:** Add `in-range` helper ([3453e22](https://github.com/MorevM/utils/commit/3453e22c8b82798c1ed020822edc1d2f3faeabfc))


### Bug fixes

* Add missed `./dom`  exports ([d59b832](https://github.com/MorevM/utils/commit/d59b8324b9da8054501ee090468e2cab85071cdf))
* **dom:** Make `getWindowScroll` safer for old browsers ([af5037a](https://github.com/MorevM/utils/commit/af5037a099de210c60581c6fa406eeb5ea3ce5bb))


### Tests

* **dom:** Add missed `get-element-offset` test ([ef8aac9](https://github.com/MorevM/utils/commit/ef8aac991270cb0db7f9ed62989b3e03434df515))


### Refactoring

* Change behavior of `isNode` ([3c41259](https://github.com/MorevM/utils/commit/3c41259032a07a3751099895d132dbfb21f26adc))
* **dom:** Rename return keys when `axis` argument is `both` ([6643216](https://github.com/MorevM/utils/commit/6643216f03f0d1f93a655a96f42bb4afe277a675))
* Move `compose`, `debounce`, `noop` and `sleep` to new category `functions` ([7b3d961](https://github.com/MorevM/utils/commit/7b3d96107b9931ac3211d99e256d34e46ea15efb))
* Move `format-bytes` to category `numbers` ([74ea9e4](https://github.com/MorevM/utils/commit/74ea9e473b8df8b6493bb719c01d1f53b27db965))
* Move `isEmail` helper to `guards` category ([0ab9050](https://github.com/MorevM/utils/commit/0ab9050b4d3883b17a0c33096326f2d00f3cef07))
* **objects:** Better types for `omit` amd `pick` ([528b04e](https://github.com/MorevM/utils/commit/528b04e6191f74e8a76b8591b21462761b005dce))
* Remove `hyphenate` helper ([8a72aff](https://github.com/MorevM/utils/commit/8a72aff0df0f3a68a5bcc6e69617278f06f33a1a))
* Remove `isObjectsEqualJson` helper ([04d003b](https://github.com/MorevM/utils/commit/04d003b8343f34a05b2689c8b23101061bef0e56))
* Rename `defaults` to `merge-objects` and move it to `objects` category ([532d79c](https://github.com/MorevM/utils/commit/532d79cb384bb49d7bb9025f6bfcb110c8771b11))
* Rename `types` category to `guards` ([008511d](https://github.com/MorevM/utils/commit/008511daf30dae9ec4f932f0055708ac20712aa9))
* Rename `utils` directory to `miscellaneous` ([b264a67](https://github.com/MorevM/utils/commit/b264a67b99db9a2dddaa55d6080e906dbbf75142))
* Rename category `browser` to `environment` ([c2c028c](https://github.com/MorevM/utils/commit/c2c028c214ca335782b4e683c69ed991a58b08c5))
* Set `compilerOptions` target and module to ESNext ([71d5a5a](https://github.com/MorevM/utils/commit/71d5a5a42658729b765e17f0c5c7a84b4650e8bf))
* **strings:** Simplify `isEmail` regexp ([1e6db40](https://github.com/MorevM/utils/commit/1e6db400201db1c56d3075b187b36afbacf4dcc7))


### Chores

* All deps update ([d744aad](https://github.com/MorevM/utils/commit/d744aad908236925ecdab3f2e836f6c9f842b80e))
* bump `@morev/eslint-config` from 15.0.0 to 15.1.0 ([117d77a](https://github.com/MorevM/utils/commit/117d77a613e9a2adcdde4214f6217bb5354e239e))
* bump `release-it` from 15.1.2 to 15.1.3 ([f60c459](https://github.com/MorevM/utils/commit/f60c459ea827da65a4569bf364caa2e0844f4b01))

## [0.21.0](https://github.com/MorevM/utils/compare/v0.20.0...v0.21.0) (2022-07-06)


### Features

* Add `formatBytes` helper ([8691ea5](https://github.com/MorevM/utils/commit/8691ea5cc4b931ac3996b9e4ccedd8b3667ab9fa))


### Chores

* bump @morev/eslint-config from 12.2.0 to 12.3.0 ([#73](https://github.com/MorevM/utils/issues/73)) ([d0f86fc](https://github.com/MorevM/utils/commit/d0f86fc34d6f5275827a85c83f34555c97cbc629))
* bump @types/jest from 28.1.1 to 28.1.2 ([#66](https://github.com/MorevM/utils/issues/66)) ([51c22b0](https://github.com/MorevM/utils/commit/51c22b0dae8d4a2e13bc7697b56ad0d26e00698d))
* bump @types/jest from 28.1.2 to 28.1.3 ([#72](https://github.com/MorevM/utils/issues/72)) ([9e08558](https://github.com/MorevM/utils/commit/9e0855894796c0f8b96e32525bba9d08cb3d156c))
* bump eslint from 8.17.0 to 8.18.0 ([#65](https://github.com/MorevM/utils/issues/65)) ([39fadae](https://github.com/MorevM/utils/commit/39fadae50e1bc34aff72028bc5028cdeb2e9c84b))
* bump lint-staged from 13.0.1 to 13.0.2 ([#68](https://github.com/MorevM/utils/issues/68)) ([395c3ee](https://github.com/MorevM/utils/commit/395c3ee90ccd65cf6f1362f343227f934075a608))
* bump lint-staged from 13.0.2 to 13.0.3 ([#71](https://github.com/MorevM/utils/issues/71)) ([46332ab](https://github.com/MorevM/utils/commit/46332ab1b39b8b60c2c8b26651328e1dd3b49a56))
* bump release-it from 15.0.0 to 15.1.0 ([#70](https://github.com/MorevM/utils/issues/70)) ([745878b](https://github.com/MorevM/utils/commit/745878b6b780161bbb241e8308113af002777641))
* bump ts-jest from 28.0.4 to 28.0.5 ([#69](https://github.com/MorevM/utils/issues/69)) ([43cfe57](https://github.com/MorevM/utils/commit/43cfe5787c372cec3f34220d3dcc15e7c49b3d67))
* bump typescript from 4.7.3 to 4.7.4 ([#67](https://github.com/MorevM/utils/issues/67)) ([d1eacc1](https://github.com/MorevM/utils/commit/d1eacc1700b5e364d0e42149ebfac2bc642c1904))
* Deps update ([1bd0c9b](https://github.com/MorevM/utils/commit/1bd0c9ba8627298d057bd8afc0267d0a476eaabe))


### Refactoring

* Remove type informaton from JSDoc's ([8f0f80a](https://github.com/MorevM/utils/commit/8f0f80a75b66aaf3afd98a94817bc2080a9e6ac3))

## [0.20.0](https://github.com/MorevM/utils/compare/v0.19.2...v0.20.0) (2022-06-14)


### Features

* **number:** Add `randomFloat` helper ([f3c91ff](https://github.com/MorevM/utils/commit/f3c91ffcf4f3c2876eb1610d19a487a2d80dc5de))


### Chores

* bump @morev/eslint-config from 12.0.0 to 12.1.1 ([#59](https://github.com/MorevM/utils/issues/59)) ([d700492](https://github.com/MorevM/utils/commit/d7004929460ef5b3e5c9cebf3b3f84d5887e09d3))
* bump @morev/eslint-config from 12.1.1 to 12.2.0 ([#63](https://github.com/MorevM/utils/issues/63)) ([186302e](https://github.com/MorevM/utils/commit/186302eee7b2678442f713db599fe3dd23ed8838))
* bump @types/jest from 27.5.1 to 28.1.0 ([#54](https://github.com/MorevM/utils/issues/54)) ([894c95a](https://github.com/MorevM/utils/commit/894c95a867c4ace48d544cb8d6cf64a8b99d0b37))
* bump eslint from 8.16.0 to 8.17.0 ([#55](https://github.com/MorevM/utils/issues/55)) ([663546d](https://github.com/MorevM/utils/commit/663546d42e811d6ec67133a7b89c6ac12d4c2d1f))
* bump jest and @types/jest ([#60](https://github.com/MorevM/utils/issues/60)) ([d5ee7de](https://github.com/MorevM/utils/commit/d5ee7de493b190ad79caae522d544a803ffd7225))
* bump jest-environment-jsdom from 28.1.0 to 28.1.1 ([#64](https://github.com/MorevM/utils/issues/64)) ([f2f4238](https://github.com/MorevM/utils/commit/f2f4238dd14fe46257308c9619f51b830e4338f2))
* bump lint-staged from 12.4.2 to 13.0.0 ([#58](https://github.com/MorevM/utils/issues/58)) ([7d3b776](https://github.com/MorevM/utils/commit/7d3b776bdda75584e52333e1095f793131b769b3))
* bump lint-staged from 13.0.0 to 13.0.1 ([#61](https://github.com/MorevM/utils/issues/61)) ([d3134af](https://github.com/MorevM/utils/commit/d3134af746afed83d447d505aa4eb869b840afd5))
* bump ts-jest from 28.0.3 to 28.0.4 ([#57](https://github.com/MorevM/utils/issues/57)) ([6a664fd](https://github.com/MorevM/utils/commit/6a664fde97f34dc37bcdffbe587d54b0f0dae5d1))
* bump tsup from 6.0.1 to 6.1.2 ([#62](https://github.com/MorevM/utils/issues/62)) ([8eb56e3](https://github.com/MorevM/utils/commit/8eb56e30b0771b7a761be38361a9b7e9481340aa))
* bump typescript from 4.7.2 to 4.7.3 ([#56](https://github.com/MorevM/utils/issues/56)) ([ccf0c01](https://github.com/MorevM/utils/commit/ccf0c015ef0989bc8cd1ec44147a135ae56230bf))

### [0.19.2](https://github.com/MorevM/utils/compare/v0.19.1...v0.19.2) (2022-06-01)


### Bug fixes

* Revert target to `node12` ([3a4484c](https://github.com/MorevM/utils/commit/3a4484c21912ce6ceb18e4aa35523b71b2f4de30))

### [0.19.1](https://github.com/MorevM/utils/compare/v0.19.0...v0.19.1) (2022-05-29)


### Bug fixes

* **objects:** Correctly convert multiple FormData entries with the same name ([34a97b1](https://github.com/MorevM/utils/commit/34a97b131990e9888b512395f4c667e9b6a3d395))

## [0.19.0](https://github.com/MorevM/utils/compare/v0.18.0...v0.19.0) (2022-05-28)


### Features

* **objects:** Add `deepEqual` helper ([146d17b](https://github.com/MorevM/utils/commit/146d17bf2ce59cc5d12c528b2ee853d6c9d2fcbd))


### Documentation

* Add missed `objectKeysCase` jsdoc ([9b2c804](https://github.com/MorevM/utils/commit/9b2c804e0a51b8b84948f874312c26d557533616))


### Bug fixes

* **types:** Clarify `isDate` return type ([a6f6245](https://github.com/MorevM/utils/commit/a6f6245ef0b3bcc647045b49712cccfb02a8119d))


### Refactoring

* Deprecate `isObjectsEqualJSON` helper ([f355970](https://github.com/MorevM/utils/commit/f35597064c762983b9caa16bce237b3684267fcb))


### Chores

* bump lint-staged from 12.4.1 to 12.4.2 ([#53](https://github.com/MorevM/utils/issues/53)) ([0ba6972](https://github.com/MorevM/utils/commit/0ba6972f24315cc45bac372a5ce4f679f7ff5cc5))
* bump ts-jest from 28.0.2 to 28.0.3 ([#51](https://github.com/MorevM/utils/issues/51)) ([de1b2d9](https://github.com/MorevM/utils/commit/de1b2d90f6bec347518db7eb3febd16a4d93c7aa))
* bump tsup from 5.12.8 to 6.0.1 ([#50](https://github.com/MorevM/utils/issues/50)) ([89fa212](https://github.com/MorevM/utils/commit/89fa2121f904a126f6f122510b665d1044993c0e))
* bump typescript from 4.6.4 to 4.7.2 ([#52](https://github.com/MorevM/utils/issues/52)) ([d2752b8](https://github.com/MorevM/utils/commit/d2752b8e6b873e2767dc6348674596253e732211))
* Disable `prefer-object-has-own` ESLint rule ([66d21c2](https://github.com/MorevM/utils/commit/66d21c2273646e302288036e93f94fab4c9ae79e))
* Disable some eslint rules for jsdoc ([3aca1c0](https://github.com/MorevM/utils/commit/3aca1c0ba34fb17c2cb9351470237849674f5726))

## [0.18.0](https://github.com/MorevM/utils/compare/v0.16.1...v0.18.0) (2022-05-21)


### Features

* **arrays:** Add `arrayShuffle` helper ([7db0655](https://github.com/MorevM/utils/commit/7db0655b3cd4f4dc4fbdaedafdd4e11b4cc0b943))
* **objects:** Add `objectKeysCase` helper ([6c60758](https://github.com/MorevM/utils/commit/6c607585bbb9043c2ad5a708c056e2bfe2802682))
* **strings:** Add `snakeCase` helper ([2ab712d](https://github.com/MorevM/utils/commit/2ab712d264351b62c154a5fa143b27796bd4a051))
* **utility:** Allow to pass undefined argument ([cec91fe](https://github.com/MorevM/utils/commit/cec91fe4e100aedee98dcb8605eca5a4577c40b8))


### Chores

* bump @morev/eslint-config from 11.4.0 to 12.0.0 ([e532591](https://github.com/MorevM/utils/commit/e53259159f3bb4581732bb07448d0dde28175188))
* bump eslint from 8.15.0 to 8.16.0 ([#48](https://github.com/MorevM/utils/issues/48)) ([13f71ea](https://github.com/MorevM/utils/commit/13f71eacdf2a8ab10b66f2a1e13e50213da6c241))
* bump husky from 7.0.4 to 8.0.1 ([#46](https://github.com/MorevM/utils/issues/46)) ([0f54e77](https://github.com/MorevM/utils/commit/0f54e77ca01728b0d1e61916a0cbd6a71091d60d))
* bump tsup from 5.12.7 to 5.12.8 ([#49](https://github.com/MorevM/utils/issues/49)) ([4f2ebaa](https://github.com/MorevM/utils/commit/4f2ebaa0e994ae654ba27082d90b9c7d02fcdfc5))
* Upgrade `jest` & co ([5450e01](https://github.com/MorevM/utils/commit/5450e0157fde6cf43564c2115ba7bc3d5217b59c))


### Tests

* Fix `array-shuffle` test ([8c89b2c](https://github.com/MorevM/utils/commit/8c89b2c306dfc6af79204687a5c7bc877c95d82f))

## [0.17.0](https://github.com/MorevM/utils/compare/v0.16.1...v0.17.0) (2022-05-09)


### Features

* **utility:** Allow to pass undefined argument ([cec91fe](https://github.com/MorevM/utils/commit/cec91fe4e100aedee98dcb8605eca5a4577c40b8))

### [0.16.1](https://github.com/MorevM/utils/compare/v0.16.0...v0.16.1) (2022-05-07)


### Chores

* bump @morev/eslint-config from 11.2.0 to 11.4.0 ([f5cd089](https://github.com/MorevM/utils/commit/f5cd0891078c20094c05cd5576144ca090f274ee))
* bump @types/jest from 27.4.1 to 27.5.0 ([#41](https://github.com/MorevM/utils/issues/41)) ([f90e2ae](https://github.com/MorevM/utils/commit/f90e2aeffeb5d1b2e73f9be3c07fca659dd46ff7))
* bump eslint from 8.14.0 to 8.15.0 ([#42](https://github.com/MorevM/utils/issues/42)) ([abc880a](https://github.com/MorevM/utils/commit/abc880ae5ca7c4a7c0c93f39bcae78fd4ff69854))
* bump lint-staged from 12.4.0 to 12.4.1 ([#39](https://github.com/MorevM/utils/issues/39)) ([0f54f99](https://github.com/MorevM/utils/commit/0f54f992c2f7cabedc967c24e9bea2e288aa838e))
* bump release-it and @release-it/conventional-changelog ([#43](https://github.com/MorevM/utils/issues/43)) ([905a9c2](https://github.com/MorevM/utils/commit/905a9c28ed2ab6e4047cb8e0d8020aca20bd5102))
* bump release-it from 14.14.2 to 14.14.3 ([#38](https://github.com/MorevM/utils/issues/38)) ([af7bca6](https://github.com/MorevM/utils/commit/af7bca6ab4aa3c8c117912fd03beef006f28e072))
* bump tsup from 5.12.6 to 5.12.7 ([#44](https://github.com/MorevM/utils/issues/44)) ([9ec7d24](https://github.com/MorevM/utils/commit/9ec7d248e31206cd952b7f1103d7f01b961677a8))
* bump typescript from 4.6.3 to 4.6.4 ([#37](https://github.com/MorevM/utils/issues/37)) ([f341e7f](https://github.com/MorevM/utils/commit/f341e7f641781d77e7e4bb11cc98d36fb372904b))

## [0.16.0](https://github.com/MorevM/utils/compare/v0.15.1...v0.16.0) (2022-04-23)


### Features

* Add `fileExtension` helper ([9bf6133](https://github.com/MorevM/utils/commit/9bf61330f23363c4bbf172760b0371454cc1859e))

### [0.15.1](https://github.com/MorevM/utils/compare/v0.15.0...v0.15.1) (2022-04-23)


### Chores

* bump @morev/eslint-config from 11.1.1 to 11.2.0 ([#36](https://github.com/MorevM/utils/issues/36)) ([ff6cdfd](https://github.com/MorevM/utils/commit/ff6cdfdf2e37bfe777ca1e3387ab812104598b7f))
* bump eslint from 8.13.0 to 8.14.0 ([#35](https://github.com/MorevM/utils/issues/35)) ([02ad3b1](https://github.com/MorevM/utils/commit/02ad3b13066f2104d49f3e8685035dc10167c369))
* bump lint-staged from 12.3.8 to 12.4.0 ([#34](https://github.com/MorevM/utils/issues/34)) ([4ca1628](https://github.com/MorevM/utils/commit/4ca16280a7ea7859b730ced1f51718947fc4d46f))
* bump tsup from 5.12.5 to 5.12.6 ([#32](https://github.com/MorevM/utils/issues/32)) ([0d2f796](https://github.com/MorevM/utils/commit/0d2f7969a705f81977a8a3e7ebb0320de14564ef))
* Recreate lock-file ([7f6f839](https://github.com/MorevM/utils/commit/7f6f8399683a16d3e6160761060a15414125d7d3))

## [0.15.0](https://github.com/MorevM/utils/compare/v0.14.1...v0.15.0) (2022-04-20)


### Features

* **objects:** Add `pick` helper ([24d030a](https://github.com/MorevM/utils/commit/24d030ad892c7bbb9388b053e9edfa8dfded4cf8))


### Chores

* bump @morev/eslint-config from 11.0.0 to 11.1.1 ([#30](https://github.com/MorevM/utils/issues/30)) ([adc3682](https://github.com/MorevM/utils/commit/adc3682b4352cdb96c7bc664e7e434a13b29a956))
* bump @release-it/conventional-changelog from 4.2.2 to 4.3.0 ([#29](https://github.com/MorevM/utils/issues/29)) ([b633e7a](https://github.com/MorevM/utils/commit/b633e7a0c780ac4881d465e7916d303d7274e2e2))
* bump lint-staged from 12.3.7 to 12.3.8 ([#27](https://github.com/MorevM/utils/issues/27)) ([4782920](https://github.com/MorevM/utils/commit/4782920f14e3e53449aa4175fe3080009ff9b248))
* bump release-it from 14.14.0 to 14.14.2 ([#31](https://github.com/MorevM/utils/issues/31)) ([73c590a](https://github.com/MorevM/utils/commit/73c590a24278a49543a351777ce3212ebd260acb))
* bump tsup from 5.12.4 to 5.12.5 ([#28](https://github.com/MorevM/utils/issues/28)) ([9643520](https://github.com/MorevM/utils/commit/96435204cfefeda3483a8b0874ce8976637a5dfb))

### [0.14.1](https://github.com/MorevM/utils/compare/v0.14.0...v0.14.1) (2022-04-15)


### Bug fixes

* **arrays:** Clarify `toArray` return type ([fc7d4f9](https://github.com/MorevM/utils/commit/fc7d4f907fe26ac14f50bedfde916f8725b6ae8d))## [0.14.0](https://github.com/MorevM/utils/compare/v0.13.0...v0.14.0) (2022-04-15)


### Features

* **dom:** Add `parent` argument to `getElementOffset` ([190c02f](https://github.com/MorevM/utils/commit/190c02f2591c1c5426a9ef53f48445702a31b77a))## [0.13.0](https://github.com/MorevM/utils/compare/v0.12.0...v0.13.0) (2022-04-15)


### Features

* **utility:** Extend `defaults` with `createDefaults`, better types ([84cb8bb](https://github.com/MorevM/utils/commit/84cb8bbb1488ccd73d98bf7515eb2403b01c8177))## [0.12.0](https://github.com/MorevM/utils/compare/v0.11.0...v0.12.0) (2022-04-13)


### Features

* **dom:** Add `getScrollableAncestor` helper ([8a67070](https://github.com/MorevM/utils/commit/8a67070936cb21af86b90246234d47254f982598))## [0.11.0](https://github.com/MorevM/utils/compare/v0.10.0...v0.11.0) (2022-04-13)


### Features

* **dom:** Add `getElement` helper ([b04c444](https://github.com/MorevM/utils/commit/b04c44410c0af0489a21ed19cb45487238ab4327))
* **types:** Add `isElement` helper ([4b3746f](https://github.com/MorevM/utils/commit/4b3746ffed5c59b0c39a8099d97772e72a16597e))


### Refactoring

* Add deprecation flag to `isNode` function due to incorrect name ([f46067b](https://github.com/MorevM/utils/commit/f46067bab9d8e780abcb7c755308fb251468d1d7))## [0.10.0](https://github.com/MorevM/utils/compare/v0.9.0...v0.10.0) (2022-04-11)


### Features

* **browser:** Add `supportsPassive` helper ([b85acf3](https://github.com/MorevM/utils/commit/b85acf31436b6051012d5e4c78479cc136df5aa7))
* **dom:** Add `getDocumentSize` helper ([78d9c2e](https://github.com/MorevM/utils/commit/78d9c2e636310d415e6579503f040aff583aa1ee))
* **dom:** Add `getScrollLimit` helper ([685d548](https://github.com/MorevM/utils/commit/685d548fd1d3d5f27fbe69d325ea1caffcd8ac35))


### Chores

* bump eslint from 8.12.0 to 8.13.0 ([#26](https://github.com/MorevM/utils/issues/26)) ([a461126](https://github.com/MorevM/utils/commit/a461126aa4765383dd20db1d338a2c63aa0ac875))## [0.9.0](https://github.com/MorevM/utils/compare/v0.8.3...v0.9.0) (2022-04-09)


### Features

* **arrays:** Add `toArray` helper ([0bdd2ea](https://github.com/MorevM/utils/commit/0bdd2ea82d7d73a427741ae5a056fa681a5eb7c2))
* **utility:** Add `debounce` helper ([d8e916c](https://github.com/MorevM/utils/commit/d8e916cb7d3d462cb6253a8294d3d2a0685ee890))


### Chores

* Deps update ([2ada02c](https://github.com/MorevM/utils/commit/2ada02c6cb86ddd1e411f46133f8ba398b7e6e26))### [0.8.3](https://github.com/MorevM/utils/compare/v0.8.2...v0.8.3) (2022-04-04)


### Bug fixes

* Add missed export ([9065d14](https://github.com/MorevM/utils/commit/9065d14aa264818112f02ba20c9cdefab25b26fd))### [0.8.2](https://github.com/MorevM/utils/compare/v0.8.1...v0.8.2) (2022-04-04)


### Chores

* bump @morev/commitlint-config from 0.1.0 to 0.1.1 ([#23](https://github.com/MorevM/utils/issues/23)) ([4746467](https://github.com/MorevM/utils/commit/4746467be98f634f80cbdf8c188fca71a05181e5))
* bump release-it from 14.13.1 to 14.14.0 ([#24](https://github.com/MorevM/utils/issues/24)) ([dbc6342](https://github.com/MorevM/utils/commit/dbc6342b3cbf4948abc5901ad1d88d2e9fdbb2fc))
* bump tsup from 5.12.1 to 5.12.2 ([#25](https://github.com/MorevM/utils/issues/25)) ([1386d41](https://github.com/MorevM/utils/commit/1386d41ecfad3cdb811cf9c858c3e5ad321ab2fa))
* Update `dependabot` settings ([9acee61](https://github.com/MorevM/utils/commit/9acee61e4f0b60de21bee5748432e042611b663f))


### Bug fixes

* Fix JSDoc typo in `[@returns](https://github.com/returns)` declaration ([7011254](https://github.com/MorevM/utils/commit/7011254098c2b4e41e68b4ba5d84144888cab1f4))
* Rename `hyphenate` to `kebabCase` ([6aee658](https://github.com/MorevM/utils/commit/6aee658b277d00c5fc569f80a8b550787be082ef))### [0.8.1](https://github.com/MorevM/utils/compare/v0.8.0...v0.8.1) (2022-03-26)


### Bug fixes

* **arrays:** Add forgotten `array-unique` export ([fc91d82](https://github.com/MorevM/utils/commit/fc91d82eba6d9a7f0c1c745c8f190d3cc4706bac))


### Chores

* Add `md` files linter ([94c8767](https://github.com/MorevM/utils/commit/94c8767c426f63916dedadfbe89b88f647d631e1))
* bump @morev/eslint-config from 8.1.0 to 8.2.0 ([#17](https://github.com/MorevM/utils/issues/17)) ([2877728](https://github.com/MorevM/utils/commit/28777280db2058ae1d08852672eb671e170d915c))
* bump eslint from 8.11.0 to 8.12.0 ([#19](https://github.com/MorevM/utils/issues/19)) ([1f38625](https://github.com/MorevM/utils/commit/1f38625dff45caa520f0664c056165635953987b))
* bump lint-staged from 12.3.5 to 12.3.7 ([#16](https://github.com/MorevM/utils/issues/16)) ([e4023a2](https://github.com/MorevM/utils/commit/e4023a212226fb186e009e881e40a9b67a3a1f20))
* bump release-it from 14.12.5 to 14.13.1 ([#22](https://github.com/MorevM/utils/issues/22)) ([3987c07](https://github.com/MorevM/utils/commit/3987c07f064f4f2950ca06f63ccb6f87c59f0eb6))
* bump ts-jest from 27.1.3 to 27.1.4 ([#20](https://github.com/MorevM/utils/issues/20)) ([17e08b5](https://github.com/MorevM/utils/commit/17e08b50bf37bfa453b8cdcb73852db24f1bbccd))
* bump typescript from 4.6.2 to 4.6.3 ([#21](https://github.com/MorevM/utils/issues/21)) ([b56902f](https://github.com/MorevM/utils/commit/b56902ff60230bb95f48c02961544cf7ca841e43))
* ESLint config upgrade ([6c4e0dc](https://github.com/MorevM/utils/commit/6c4e0dc734a9e4e62742036c68e991e57319e1a6))## [0.8.0](https://github.com/MorevM/utils/compare/v0.7.2...v0.8.0) (2022-03-18)


### Features

* **types:** Add `is-boolean` helper ([1111094](https://github.com/MorevM/utils/commit/11110941f448edd404525b2fa1988259ed70f5f3))


### Bug fixes

* Correct test names ([cf47e43](https://github.com/MorevM/utils/commit/cf47e435eb75cb06fc25b2b667d593c2e2c6b99b))### [0.7.2](https://github.com/MorevM/utils/compare/v0.7.1...v0.7.2) (2022-03-18)### [0.7.1](https://github.com/MorevM/utils/compare/v0.7.0...v0.7.1) (2022-03-18)


### Chores

* bump @release-it/conventional-changelog from 4.2.1 to 4.2.2 ([#15](https://github.com/MorevM/utils/issues/15)) ([cc1814a](https://github.com/MorevM/utils/commit/cc1814a3961f4e630643e6d6619873b1cb04b6c4))
* bump eslint from 8.10.0 to 8.11.0 ([#13](https://github.com/MorevM/utils/issues/13)) ([c86faa5](https://github.com/MorevM/utils/commit/c86faa5ca3e920cf221095fddf55fe5554f50905))
* bump tsup from 5.12.0 to 5.12.1 ([#14](https://github.com/MorevM/utils/issues/14)) ([3a21810](https://github.com/MorevM/utils/commit/3a218100a9c71660f8fe19af385ee833d8a5a3ed))


### Bug fixes

* **types:** Clarify `isInteger` return type ([56a9dc2](https://github.com/MorevM/utils/commit/56a9dc249adf13f36cb9ae3146bca67d5bc87139))## [0.7.0](https://github.com/MorevM/utils/compare/v0.6.0...v0.7.0) (2022-03-18)


### Features

* **types:** Add `is-function` helper ([4b44c77](https://github.com/MorevM/utils/commit/4b44c77ae5f67696d0f19dba9b5c6c66942633d4))
* **types:** Add `is-promise` helper ([726a0f3](https://github.com/MorevM/utils/commit/726a0f39a6ae35e0324eddb932eab5d63aeb9546))


### Bug fixes

* **types:** Clarify `isNullish` return type ([df2ce3b](https://github.com/MorevM/utils/commit/df2ce3babaaf78eac4c48a4575a2353b094f53fe))
* **types:** Clarify `isNumeric` return type ([7053e59](https://github.com/MorevM/utils/commit/7053e596aad22a0048b3f2e8993ecffc4716489c))
* **types:** Clarify `isRegExp` return type ([a56b957](https://github.com/MorevM/utils/commit/a56b957181b1d55ec40e275a87c07a7f5b68ef84))## [0.6.0](https://github.com/MorevM/utils/compare/v0.5.0...v0.6.0) (2022-03-09)


### Features

* **arrays:** Add `array-unique` function ([2b5e5b7](https://github.com/MorevM/utils/commit/2b5e5b7de598d4f2662611bf156e13986f4ad23e))


### Bug fixes

* **arrays:** Add missed `array` export ([d1a23e3](https://github.com/MorevM/utils/commit/d1a23e3aed0d767e7490b23b0527b333997050f8))


### Chores

* bump @release-it/conventional-changelog from 4.1.0 to 4.2.0 ([#6](https://github.com/MorevM/utils/issues/6)) ([3247038](https://github.com/MorevM/utils/commit/3247038fc001c5999e46d2132178c9363c2449d1))
* bump @types/jest from 27.4.0 to 27.4.1 ([#5](https://github.com/MorevM/utils/issues/5)) ([190e23a](https://github.com/MorevM/utils/commit/190e23a0253824ac9191631f1f286f94d075b571))
* bump eslint from 8.9.0 to 8.10.0 ([#8](https://github.com/MorevM/utils/issues/8)) ([7bf0b4f](https://github.com/MorevM/utils/commit/7bf0b4fd233bdada794faebb3388e3e20cb5eb00))
* bump lint-staged from 12.3.4 to 12.3.5 ([#10](https://github.com/MorevM/utils/issues/10)) ([62f74e2](https://github.com/MorevM/utils/commit/62f74e26db9953e0d742d3fbacefc2f3df9e830f))
* bump release-it from 14.12.4 to 14.12.5 ([#7](https://github.com/MorevM/utils/issues/7)) ([a9245f8](https://github.com/MorevM/utils/commit/a9245f84314b037ad1094bfece37b528a6aa8b28))
* bump typescript from 4.5.5 to 4.6.2 ([#11](https://github.com/MorevM/utils/issues/11)) ([7339f6c](https://github.com/MorevM/utils/commit/7339f6c7a8307b963c21a5fbbeb5aad98d371246))
* **deps:** Upgrade dependencies ([562e1d3](https://github.com/MorevM/utils/commit/562e1d3dcf34ee96df691bd695b06548dc2315b1))## [0.5.0](https://github.com/MorevM/utils/compare/v0.4.3...v0.5.0) (2022-02-23)


### Features

* Remove `camelcase` dependency ([a03349b](https://github.com/MorevM/utils/commit/a03349b171c0674255131b8ed2152bbfde33dec5))

### [0.4.3](https://github.com/MorevM/utils/compare/v0.4.2...v0.4.3) (2022-02-23)


### Bug fixes

* **types:** Clarify `isString` return type ([1a16164](https://github.com/MorevM/utils/commit/1a16164cf32fcd0f7cf6b7d6cb087526052d2286))

### [0.4.2](https://github.com/MorevM/utils/compare/v0.4.1...v0.4.2) (2022-02-23)


### Bug fixes

* **arrays:** Clarify array methods types ([f4e2990](https://github.com/MorevM/utils/commit/f4e29908a563e76845cda517e38a5f1394a70a7c))
* Explicit return values ([762b2a9](https://github.com/MorevM/utils/commit/762b2a9f67315c979f5bbfaca2714682cafacc34))

### [0.4.1](https://github.com/MorevM/utils/compare/v0.4.0...v0.4.1) (2022-02-22)


### Bug fixes

* Add forgotten `capitalize` export ([2b951a1](https://github.com/MorevM/utils/commit/2b951a124f66bc6bbccbd842dd61ef0cfd1e5d1f))
* Clarify `is-array` and `is-object` return type ([87632ec](https://github.com/MorevM/utils/commit/87632ec544dc40b1063d02beeefa8174d8ae7077))

## [0.4.0](https://github.com/MorevM/utils/compare/v0.3.0...v0.4.0) (2022-02-22)


### Features

* **strings:** Add `capitalize` function ([ee999f0](https://github.com/MorevM/utils/commit/ee999f0f07fdafbea389b37630a7ed5ab8ecfbbe))


### Tests

* Fix `sleep` test ([3ee2a6b](https://github.com/MorevM/utils/commit/3ee2a6bd2a72424c77e25eea935b4fa5311846e8))


### Chores

* bump @morev/eslint-config from 5.2.0 to 6.0.1 ([#4](https://github.com/MorevM/utils/issues/4)) ([a39905c](https://github.com/MorevM/utils/commit/a39905cc866405b3b87468b3702a851671a2be07))

## [0.3.0](https://github.com/MorevM/utils/compare/v0.2.0...v0.3.0) (2022-02-15)


### Features

* **strings:** Add `hash` helper ([38e611d](https://github.com/MorevM/utils/commit/38e611d9785e176f98089cfa83dc04489d8a07c6))
* **utility:** Add `sleep` helper ([b65df7a](https://github.com/MorevM/utils/commit/b65df7ac25d959e11afe747ce62b5094d635f777))

## [0.2.0](https://github.com/MorevM/utils/compare/v0.1.0...v0.2.0) (2022-02-15)


### Features

* Add helpers to work with `FormData` object ([c5f15d4](https://github.com/MorevM/utils/commit/c5f15d4f51425e14a8ef34702b63467482bc29f1))


### Chores

* bump eslint from 8.8.0 to 8.9.0 ([#1](https://github.com/MorevM/utils/issues/1)) ([1bff1cf](https://github.com/MorevM/utils/commit/1bff1cf90542c51d95fc640a48db9628b48b971a))
* bump lint-staged from 12.3.3 to 12.3.4 ([#2](https://github.com/MorevM/utils/issues/2)) ([937eeba](https://github.com/MorevM/utils/commit/937eeba8209b6366687fad949853f720fddebcbc))
* bump tsup from 5.11.11 to 5.11.13 ([#3](https://github.com/MorevM/utils/issues/3)) ([e5f02be](https://github.com/MorevM/utils/commit/e5f02be9084f21942c46e5e61717fff8e5df13fe))
* **deps:** Upgrade eslint config ([f56bcd6](https://github.com/MorevM/utils/commit/f56bcd6fb6feadb8a02036fb0bad26b94febbda7))


### Bug fixes

* Add missed `types` exports ([54a4178](https://github.com/MorevM/utils/commit/54a4178e7ccd942af46cc40957507dc52e8afc57))

## [0.1.0](https://github.com/MorevM/utils/compare/v0.0.1...v0.1.0) (2022-02-14)


### Features

* Add `formatSlashes` helper ([1abb38f](https://github.com/MorevM/utils/commit/1abb38f7021253ddb30e908a090b892a78e58599))

### 0.0.1 (2022-02-14)


### Bug fixes

* Change package name ([252274c](https://github.com/MorevM/utils/commit/252274c111df3b14204ca8ccfd5bf08efdbad1c9))
