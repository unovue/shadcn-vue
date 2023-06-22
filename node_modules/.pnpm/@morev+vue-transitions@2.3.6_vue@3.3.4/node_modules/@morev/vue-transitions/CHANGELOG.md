

### [2.3.6](https://github.com/MorevM/vue-transitions/compare/v2.3.5...v2.3.6) (2023-01-17)

### Bug fixes

* **nuxt:** Automatically transpile shared utility library ([6dc4273](https://github.com/MorevM/vue-transitions/commit/6dc4273ef3bce461ddfa840b720d0e0fcbd6fc7d))

### [2.3.5](https://github.com/MorevM/vue-transitions/compare/v2.3.4...v2.3.5) (2022-12-16)


### Bug fixes

* Preserve custom attributes in `<transition-group>` element ([b09a153](https://github.com/MorevM/vue-transitions/commit/b09a1534e8349922c7172c085af784ce47952ebb))

### [2.3.4](https://github.com/MorevM/vue-transitions/compare/v2.3.3...v2.3.4) (2022-12-02)


### Bug fixes

* **nuxt:** Fix production build using Nuxt 3 ([aacf876](https://github.com/MorevM/vue-transitions/commit/aacf87676f434ce4e5c73f2b406d0d6027ec0b9d))

### [2.3.3](https://github.com/MorevM/vue-transitions/compare/v2.3.2...v2.3.3) (2022-11-24)


### Bug fixes

* **nuxt:** Take account of newly created transitions on the first run ([bb850ad](https://github.com/MorevM/vue-transitions/commit/bb850adef9737493942b7f783d8d6b14b3cf128b))

### [2.3.2](https://github.com/MorevM/vue-transitions/compare/v2.3.1...v2.3.2) (2022-11-24)


### Bug fixes

* **nuxt:** Don't inherit attrs for component mappings ([e541b4d](https://github.com/MorevM/vue-transitions/commit/e541b4da64a3afd5df53a6820ff190c5732a59ab))
* **nuxt:** Use `addComponentsDir` instead of individual `addComponent` ([403983a](https://github.com/MorevM/vue-transitions/commit/403983a7e85a94f8c326d4e9a7b81b2ca63ee8bc))


### [2.3.1](https://github.com/MorevM/vue-transitions/compare/v2.3.0...v2.3.1) (2022-11-20)


### Bug fixes

* Note `./nuxt` export in the main `package.json` ([97bf252](https://github.com/MorevM/vue-transitions/commit/97bf25296796ddc77b9e266bc43a4999cb76a5db))

## [2.3.0](https://github.com/MorevM/vue-transitions/compare/v2.2.2...v2.3.0) (2022-11-20)


### Features

* Add Nuxt module ([dc1dd75](https://github.com/MorevM/vue-transitions/commit/dc1dd75503aa15b1ca0c3c09f1048fdbb1af5e94))


### Bug fixes

* **types:** Export individual transition types ([a21ca94](https://github.com/MorevM/vue-transitions/commit/a21ca94cb97c7ca464f545495cbfebd711eddf77))


### Documentation

* Add info about Nuxt module usage ([7293760](https://github.com/MorevM/vue-transitions/commit/7293760322410c3df88f5bce28220523a998ef62))
* Correct order of sections in TOC ([2586e10](https://github.com/MorevM/vue-transitions/commit/2586e1053a4cd22f5b1fefcac147dfefdfad94d5))

### [2.2.2](https://github.com/MorevM/vue-transitions/compare/v2.2.1...v2.2.2) (2022-10-20)

### Bug fixes

* Don't pass `mode` attribute to `transition-group` element ([42f9ccd](https://github.com/MorevM/vue-transitions/commit/42f9ccd48cc858466a0f5d0b573a5101e8d20fc3))
* **transition-expand:** Wait an extra tick before element size resolving ([7b3d845](https://github.com/MorevM/vue-transitions/commit/7b3d84500fd63bf7c02500e1f827704635003750))

### [2.2.1](https://github.com/MorevM/vue-transitions/compare/v2.2.0...v2.2.1) (2022-09-10)


### Bug fixes

* **build:** Correct filename and path of resulting CSS file ([bf65edd](https://github.com/MorevM/vue-transitions/commit/bf65edd2870eb234d2dd790878296da56ee23ca4))

## [2.2.0](https://github.com/MorevM/vue-transitions/compare/v2.1.4...v2.2.0) (2022-09-10)


### Features

* **types:** Add inline documentation for `d.ts` file ([51864f3](https://github.com/MorevM/vue-transitions/commit/51864f3ae458a86691c2a61c751575f8a421159f))
* **types:** Expose component props and emit types ([e7f1ce1](https://github.com/MorevM/vue-transitions/commit/e7f1ce1a2854898d88e516d5d54d73fd2ce13b55))
* **types:** Typings for global components using Volar ([cfcd7b4](https://github.com/MorevM/vue-transitions/commit/cfcd7b4164ae0ba32346cc0836fbe9653a9351b1))


### Bug fixes

* **types:** Make plugin options optional ([5bb681a](https://github.com/MorevM/vue-transitions/commit/5bb681ad1449d15b7db5b1132606ac3515c4179c))


### Documentation

* Add info about TS/Intellisense support ([0ef0821](https://github.com/MorevM/vue-transitions/commit/0ef0821d1e99d6f7f92889b0c08efd6edcf009c0))


### Chores

* bump @babel/core from 7.18.2 to 7.19.0 ([e12b424](https://github.com/MorevM/vue-transitions/commit/e12b42444084ddbd0e1ea53fe81cfc67bb2975b7))
* bump @babel/eslint-parser from 7.18.2 to 7.18.9 ([#117](https://github.com/MorevM/vue-transitions/issues/117)) ([97f0973](https://github.com/MorevM/vue-transitions/commit/97f097388f32415d34057b2cadf70b0dc93bfb84))
* bump @babel/plugin-syntax-jsx from 7.17.12 to 7.18.6 ([#99](https://github.com/MorevM/vue-transitions/issues/99)) ([4774dda](https://github.com/MorevM/vue-transitions/commit/4774dda4d2807b11f1a4d7c8456808754016dea5))
* bump @babel/plugin-transform-modules-commonjs ([#98](https://github.com/MorevM/vue-transitions/issues/98)) ([2ff0b4c](https://github.com/MorevM/vue-transitions/commit/2ff0b4cd9c322af61e0b8f6ca84081e63c794bd2))
* bump @morev/eslint-config from 12.2.0 to 17.0.1 ([3d2d46d](https://github.com/MorevM/vue-transitions/commit/3d2d46d97ff162b329393c3de5a0f31d48499f35))
* bump @morev/helpers from 0.19.2 1.4.1 ([889348b](https://github.com/MorevM/vue-transitions/commit/889348b77c9027709215c14058ca15307e038973))
* bump @morev/stylelint-config from 1.1.0 to 2.0.0 ([#139](https://github.com/MorevM/vue-transitions/issues/139)) ([496eda9](https://github.com/MorevM/vue-transitions/commit/496eda9bafde6b4ebcbbd141db613fee9c81cc7c))
* bump @types/jest from 28.1.1 to 28.1.3 ([#86](https://github.com/MorevM/vue-transitions/issues/86)) ([5896c25](https://github.com/MorevM/vue-transitions/commit/5896c25c65a8806a40677582f8146e78a796cc3e))
* bump @vitejs/plugin-vue from 2.3.3 to 3.0.1 ([28e5e4d](https://github.com/MorevM/vue-transitions/commit/28e5e4d61b03001cff9557aa9c54c260e6d8094d))
* bump `vue` and `vue-template-compiler` from 2.6.14 to 2.7.8 ([9e5fa9e](https://github.com/MorevM/vue-transitions/commit/9e5fa9e9d5c27d14be9d57e0866377538e21a258))
* bump eslint from 8.17.0 to 8.22.0 ([#144](https://github.com/MorevM/vue-transitions/issues/144)) ([e431bb7](https://github.com/MorevM/vue-transitions/commit/e431bb76a54bf4cc564ae68bc35bc5962299ad45))
* bump jest and @types/jest ([#109](https://github.com/MorevM/vue-transitions/issues/109)) ([d177775](https://github.com/MorevM/vue-transitions/commit/d177775564365834e5162836839fb65bb3a36b94))
* bump lint-staged from 13.0.1 to 13.0.3 ([#83](https://github.com/MorevM/vue-transitions/issues/83)) ([b531a69](https://github.com/MorevM/vue-transitions/commit/b531a69b3acfcc4f592a06c40d0bbc4ce29376d0))
* bump more-sass from 1.0.7 to 1.0.8 ([#122](https://github.com/MorevM/vue-transitions/issues/122)) ([e293c0e](https://github.com/MorevM/vue-transitions/commit/e293c0e373ce3edb1d862042c7ad2064a936d15f))
* bump release-it from 15.0.0 15.3.0 ([#136](https://github.com/MorevM/vue-transitions/issues/136)) ([407478a](https://github.com/MorevM/vue-transitions/commit/407478a5e862b3581618aa12f819f43951403fbd))
* bump sass from 1.52.3 to 1.54.9 ([7c7c54d](https://github.com/MorevM/vue-transitions/commit/7c7c54dacd158db657cc11f7bd63c2ade755cd2c))
* bump stylelint from 14.9.1 to 14.10.0 ([#132](https://github.com/MorevM/vue-transitions/issues/132)) ([748eef8](https://github.com/MorevM/vue-transitions/commit/748eef8ac0f4d7f1c33ff26644bbb8863b3f6046))
* bump typescript from 4.7.3 to 4.8.3 ([295849c](https://github.com/MorevM/vue-transitions/commit/295849c12e2de4575031dc1b67cc6d8777047cb9))
* bump vite from 2.9.12 to 3.1.0 ([43be17f](https://github.com/MorevM/vue-transitions/commit/43be17f62ddc232df2da1e7422288eb4e96c5aca))
* bump vite-plugin-vue2 from 2.0.1 to 2.0.2 ([#110](https://github.com/MorevM/vue-transitions/issues/110)) ([8eeb338](https://github.com/MorevM/vue-transitions/commit/8eeb338bd9bc968690c93a773374658606fd1699))
* bump vue and @vitejs/plugin-vue to latest ([11f8664](https://github.com/MorevM/vue-transitions/commit/11f866444a649947a7018b1950847afb559e6610))
* bump vue-types from 4.1.1 to 4.2.1 ([#129](https://github.com/MorevM/vue-transitions/issues/129)) ([5a901bb](https://github.com/MorevM/vue-transitions/commit/5a901bb144960150f98ab307c7000f5a22d97c7c))

### [2.1.4](https://github.com/MorevM/vue-transitions/compare/v2.1.3...v2.1.4) (2022-06-11)


### Chores

* bump @babel/core from 7.17.10 to 7.18.0 ([#57](https://github.com/MorevM/vue-transitions/issues/57)) ([f027b3f](https://github.com/MorevM/vue-transitions/commit/f027b3f8e672d1914561a44d7ca97ef82d641dea))
* bump @babel/core from 7.17.9 to 7.17.10 ([#43](https://github.com/MorevM/vue-transitions/issues/43)) ([4a77007](https://github.com/MorevM/vue-transitions/commit/4a770071f59d8ed66d9aff9983d55e1d71f46caf))
* bump @babel/core from 7.18.0 to 7.18.2 ([#65](https://github.com/MorevM/vue-transitions/issues/65)) ([e7790e7](https://github.com/MorevM/vue-transitions/commit/e7790e79bc159e4b9d9c3e9ad32f224ab8c088d0))
* bump @babel/eslint-parser from 7.17.0 to 7.18.2 ([#61](https://github.com/MorevM/vue-transitions/issues/61)) ([277bfd3](https://github.com/MorevM/vue-transitions/commit/277bfd3c0c7d0ebf28b719bffe604ff0d6c5c2a9))
* bump @babel/plugin-syntax-jsx from 7.16.7 to 7.17.12 ([#53](https://github.com/MorevM/vue-transitions/issues/53)) ([d18f8ec](https://github.com/MorevM/vue-transitions/commit/d18f8ec6efbc8c40ef5f4e89d0731246c737ce5f))
* bump @babel/plugin-transform-modules-commonjs ([#54](https://github.com/MorevM/vue-transitions/issues/54)) ([d9a61f9](https://github.com/MorevM/vue-transitions/commit/d9a61f9181666eb4ce5f3086495e73cb57fa6cea))
* bump @babel/plugin-transform-modules-commonjs ([#66](https://github.com/MorevM/vue-transitions/issues/66)) ([18f6934](https://github.com/MorevM/vue-transitions/commit/18f693491556654363c1938eb3dda84ce49403b5))
* bump @morev/eslint-config from 11.1.1 to 11.2.0 ([#32](https://github.com/MorevM/vue-transitions/issues/32)) ([a22d5de](https://github.com/MorevM/vue-transitions/commit/a22d5dec6efa0296b1b9fddf056406baa8632e49))
* bump @morev/eslint-config from 11.2.0 to 11.4.0 ([#50](https://github.com/MorevM/vue-transitions/issues/50)) ([550d395](https://github.com/MorevM/vue-transitions/commit/550d395f8ab6d57b20d486e961f691b59c3a2528))
* bump @morev/eslint-config from 11.4.0 to 12.0.0 ([#60](https://github.com/MorevM/vue-transitions/issues/60)) ([ce51705](https://github.com/MorevM/vue-transitions/commit/ce51705d212fb6bdbb8543e16d091a76921745cb))
* bump @morev/eslint-config from 12.0.0 to 12.2.0 ([#77](https://github.com/MorevM/vue-transitions/issues/77)) ([b9f3405](https://github.com/MorevM/vue-transitions/commit/b9f3405d9cbd411c19fbe3b77d605e92426cb018))
* bump @morev/helpers from 0.14.1 to 0.16.0 ([#35](https://github.com/MorevM/vue-transitions/issues/35)) ([a6662ca](https://github.com/MorevM/vue-transitions/commit/a6662ca8f7fd301d9ec2a2c0dc03224cd4165d85))
* bump @morev/helpers from 0.16.1 to 0.18.0 ([#62](https://github.com/MorevM/vue-transitions/issues/62)) ([9fb9fbd](https://github.com/MorevM/vue-transitions/commit/9fb9fbd6746dcda0c9b56ccda3144eaf3c44e48b))
* bump @morev/helpers from 0.18.0 to 0.19.2 ([#71](https://github.com/MorevM/vue-transitions/issues/71)) ([fc9652d](https://github.com/MorevM/vue-transitions/commit/fc9652db2a8bfa08bdaa0de450335c5c247a71ed))
* bump @morev/stylelint-config from 1.0.3 to 1.1.0 ([#74](https://github.com/MorevM/vue-transitions/issues/74)) ([1a5b4f1](https://github.com/MorevM/vue-transitions/commit/1a5b4f176564ac90222d91d87bc97c8820626f9f))
* bump @types/jest from 27.4.1 to 27.5.0 ([#40](https://github.com/MorevM/vue-transitions/issues/40)) ([4697ccd](https://github.com/MorevM/vue-transitions/commit/4697ccde4ad09b483c4e27cc883347c25f7c1502))
* bump @types/jest from 27.5.0 to 27.5.1 ([#52](https://github.com/MorevM/vue-transitions/issues/52)) ([cc301ec](https://github.com/MorevM/vue-transitions/commit/cc301ec6c9e6cfb6db24127109b083d85e4d0919))
* bump @types/jest from 27.5.1 to 28.1.0 ([#70](https://github.com/MorevM/vue-transitions/issues/70)) ([a3727a1](https://github.com/MorevM/vue-transitions/commit/a3727a1ae75ef198f0aeff7de762851a04cedac9))
* bump @vitejs/plugin-vue from 2.3.1 to 2.3.2 ([#42](https://github.com/MorevM/vue-transitions/issues/42)) ([9699b4a](https://github.com/MorevM/vue-transitions/commit/9699b4a25aed28abcd16065e03a52c51a1459670))
* bump @vitejs/plugin-vue from 2.3.2 to 2.3.3 ([#47](https://github.com/MorevM/vue-transitions/issues/47)) ([694a548](https://github.com/MorevM/vue-transitions/commit/694a5483ff7544ed94b86f49f1a432a2679f5984))
* bump `@morev/helpers` from 0.16.0 to 0.16.1 ([f06db8d](https://github.com/MorevM/vue-transitions/commit/f06db8d370639ccc949adf5bd65b62eed30b48ed))
* bump `@morev/v-bem-transformer` from 1.0.0 to 1.0.1 ([f296e47](https://github.com/MorevM/vue-transitions/commit/f296e47e083236519540bd165fb391afb8802be0))
* bump `jest` from 27.5.1 to 28.1.0 ([2c3458f](https://github.com/MorevM/vue-transitions/commit/2c3458f7f54118ca13d716a38db7480b2c2020c9))
* bump element-ui from 2.15.8 to 2.15.9 ([#76](https://github.com/MorevM/vue-transitions/issues/76)) ([f96edde](https://github.com/MorevM/vue-transitions/commit/f96edde8d6d546e09b5073b4c335d47b7bd2fbcc))
* bump eslint from 8.13.0 to 8.14.0 ([#27](https://github.com/MorevM/vue-transitions/issues/27)) ([b360c59](https://github.com/MorevM/vue-transitions/commit/b360c5919ddcf1fd0b80f683b106a1fb0cfe7591))
* bump eslint from 8.14.0 to 8.15.0 ([#37](https://github.com/MorevM/vue-transitions/issues/37)) ([9f6a6c3](https://github.com/MorevM/vue-transitions/commit/9f6a6c3b222edb04a2125c7bb74847756d10dfd0))
* bump eslint from 8.15.0 to 8.16.0 ([#56](https://github.com/MorevM/vue-transitions/issues/56)) ([1fd97bd](https://github.com/MorevM/vue-transitions/commit/1fd97bde532d0894c0d2197ea8510fe1ec4f113f))
* bump eslint from 8.16.0 to 8.17.0 ([#69](https://github.com/MorevM/vue-transitions/issues/69)) ([0bfad1d](https://github.com/MorevM/vue-transitions/commit/0bfad1d9c8182d283e26cc332d32f29eb8bb5e7c))
* bump husky from 7.0.4 to 8.0.1 ([#49](https://github.com/MorevM/vue-transitions/issues/49)) ([8776d13](https://github.com/MorevM/vue-transitions/commit/8776d13c72c64682cb5a71e571f8808cb1d4c11a))
* bump jest and @types/jest ([#79](https://github.com/MorevM/vue-transitions/issues/79)) ([f4089c5](https://github.com/MorevM/vue-transitions/commit/f4089c50edf3a3e5d783fcd001cc2705c0c83eb4))
* bump lint-staged from 12.3.8 to 12.4.0 ([#30](https://github.com/MorevM/vue-transitions/issues/30)) ([38b7027](https://github.com/MorevM/vue-transitions/commit/38b7027bc18aca034e0784c7a73349d227e74f7d))
* bump lint-staged from 12.4.0 to 12.4.1 ([#45](https://github.com/MorevM/vue-transitions/issues/45)) ([332935f](https://github.com/MorevM/vue-transitions/commit/332935f1253b9509cce6a006e139d03742141ac9))
* bump lint-staged from 12.4.1 to 12.4.2 ([#67](https://github.com/MorevM/vue-transitions/issues/67)) ([7e1c4dc](https://github.com/MorevM/vue-transitions/commit/7e1c4dcc82d3c53877b48a319b85e363588aaab3))
* bump lint-staged from 12.4.2 to 13.0.0 ([#75](https://github.com/MorevM/vue-transitions/issues/75)) ([d6da9d8](https://github.com/MorevM/vue-transitions/commit/d6da9d8779ca8fb763cc6dab75c90ab3450c5e89))
* bump lint-staged from 13.0.0 to 13.0.1 ([#78](https://github.com/MorevM/vue-transitions/issues/78)) ([3a21b17](https://github.com/MorevM/vue-transitions/commit/3a21b178c039c2ca74a33c38ed0fa6f1bdd7d6c9))
* bump release-it and @release-it/conventional-changelog ([#48](https://github.com/MorevM/vue-transitions/issues/48)) ([62a6eee](https://github.com/MorevM/vue-transitions/commit/62a6eee8d73d9794faf42ee38efe2ec0882e890a))
* bump release-it from 14.14.2 to 14.14.3 ([#38](https://github.com/MorevM/vue-transitions/issues/38)) ([cd54b6d](https://github.com/MorevM/vue-transitions/commit/cd54b6d4397c3d7d2dc67218be4f7045cedbab4e))
* bump sass from 1.50.0 to 1.50.1 ([#28](https://github.com/MorevM/vue-transitions/issues/28)) ([0b31292](https://github.com/MorevM/vue-transitions/commit/0b312929fad2b711ab1786d84aae83a609774711))
* bump sass from 1.50.1 to 1.51.0 ([#44](https://github.com/MorevM/vue-transitions/issues/44)) ([371e264](https://github.com/MorevM/vue-transitions/commit/371e264d5513614e4f2813700a304de223522c51))
* bump sass from 1.51.0 to 1.52.1 ([#58](https://github.com/MorevM/vue-transitions/issues/58)) ([fa26379](https://github.com/MorevM/vue-transitions/commit/fa26379a3b26c9d895ab6acb8066b7b06ec5223c))
* bump sass from 1.52.1 to 1.52.2 ([#68](https://github.com/MorevM/vue-transitions/issues/68)) ([d8e0875](https://github.com/MorevM/vue-transitions/commit/d8e0875f1b0d0b12eb6a350b10b33a7ef0cbedfe))
* bump sass from 1.52.2 to 1.52.3 ([#82](https://github.com/MorevM/vue-transitions/issues/82)) ([b73889c](https://github.com/MorevM/vue-transitions/commit/b73889c5095efa09d21d60aa3326fe5a2a0de56a))
* bump stylelint from 14.7.0 to 14.7.1 ([#26](https://github.com/MorevM/vue-transitions/issues/26)) ([5263d71](https://github.com/MorevM/vue-transitions/commit/5263d715d1273593373285a43197bb51c503a202))
* bump stylelint from 14.7.1 to 14.8.2 ([#39](https://github.com/MorevM/vue-transitions/issues/39)) ([9ef71b9](https://github.com/MorevM/vue-transitions/commit/9ef71b946e3f8b8e23a8b9c16398653dc2c4cd71))
* bump stylelint from 14.8.2 to 14.8.5 ([#64](https://github.com/MorevM/vue-transitions/issues/64)) ([2154819](https://github.com/MorevM/vue-transitions/commit/21548193938cf4ac98c69e773fc3ebc678530bdf))
* bump stylelint from 14.8.5 to 14.9.1 ([#81](https://github.com/MorevM/vue-transitions/issues/81)) ([20d924c](https://github.com/MorevM/vue-transitions/commit/20d924ca21f2587fbacd42bbdd0667f7ee546c18))
* bump typescript from 4.6.3 to 4.6.4 ([#36](https://github.com/MorevM/vue-transitions/issues/36)) ([b76fc8c](https://github.com/MorevM/vue-transitions/commit/b76fc8cfdc6fd311ef26d9e65eab46419c792cf1))
* bump typescript from 4.6.4 to 4.7.2 ([#63](https://github.com/MorevM/vue-transitions/issues/63)) ([205895b](https://github.com/MorevM/vue-transitions/commit/205895bd189afcc1e61f006ddc071ac69fdf1953))
* bump typescript from 4.7.2 to 4.7.3 ([#73](https://github.com/MorevM/vue-transitions/issues/73)) ([0c2e82c](https://github.com/MorevM/vue-transitions/commit/0c2e82c6a0abc8fcdac0e7d26aeab4e95a49e37f))
* bump vite from 2.9.5 to 2.9.8 ([#46](https://github.com/MorevM/vue-transitions/issues/46)) ([41bb7e9](https://github.com/MorevM/vue-transitions/commit/41bb7e97d8ecb64a03e088fb9da85fdacb5fb168))
* bump vite from 2.9.8 to 2.9.9 ([#51](https://github.com/MorevM/vue-transitions/issues/51)) ([5fbe156](https://github.com/MorevM/vue-transitions/commit/5fbe156602c5a6f8fa1defab21647560be1fb753))
* bump vite from 2.9.9 to 2.9.12 ([#80](https://github.com/MorevM/vue-transitions/issues/80)) ([9ac7f8d](https://github.com/MorevM/vue-transitions/commit/9ac7f8d2eb68d24675f7607f6230fed4556df738))
* bump vite-plugin-vue2 from 1.9.3 to 2.0.0 ([#34](https://github.com/MorevM/vue-transitions/issues/34)) ([a3c811c](https://github.com/MorevM/vue-transitions/commit/a3c811c9529448e865f439163e86ce764d06ef6b))
* bump vite-plugin-vue2 from 2.0.0 to 2.0.1 ([#55](https://github.com/MorevM/vue-transitions/issues/55)) ([305baf6](https://github.com/MorevM/vue-transitions/commit/305baf6e49bb72a8bbe565618c667c709bdb5f55))

### [2.1.3](https://github.com/MorevM/vue-transitions/compare/v2.1.2...v2.1.3) (2022-04-17)


### Chores

* bump @morev/eslint-config from 11.1.0 to 11.1.1 ([#19](https://github.com/MorevM/vue-transitions/issues/19)) ([5378923](https://github.com/MorevM/vue-transitions/commit/5378923ff65dca06740f5f018cce40092635f52b))
* bump @morev/helpers from 0.10.0 to 0.14.1 ([#24](https://github.com/MorevM/vue-transitions/issues/24)) ([acaaa42](https://github.com/MorevM/vue-transitions/commit/acaaa42c63bc708c45c8d21f124b89686d2b8c02))
* bump @release-it/conventional-changelog from 4.2.2 to 4.3.0 ([#25](https://github.com/MorevM/vue-transitions/issues/25)) ([bf78d0f](https://github.com/MorevM/vue-transitions/commit/bf78d0f39a3892bf42f2d39ef1e92f1f10625a76))
* bump element-ui from 2.15.6 to 2.15.8 ([#21](https://github.com/MorevM/vue-transitions/issues/21)) ([f641551](https://github.com/MorevM/vue-transitions/commit/f641551bd05b2c3c3fe134a3b0254f5096164dfa))
* bump lint-staged from 12.3.7 to 12.3.8 ([#23](https://github.com/MorevM/vue-transitions/issues/23)) ([c950d0e](https://github.com/MorevM/vue-transitions/commit/c950d0e2eb23545b54e5122fc91561c5d87e9b52))
* bump stylelint from 14.6.1 to 14.7.0 ([#22](https://github.com/MorevM/vue-transitions/issues/22)) ([ef418ef](https://github.com/MorevM/vue-transitions/commit/ef418ef595cfbe9e835caec9f2ce484afa7a4551))
* bump vite from 2.9.1 to 2.9.5 ([#20](https://github.com/MorevM/vue-transitions/issues/20)) ([7e64ba1](https://github.com/MorevM/vue-transitions/commit/7e64ba1f28c44c5e6998deaccf368f16d2fc8703))### [2.1.2](https://github.com/MorevM/vue-transitions/compare/v2.1.1...v2.1.2) (2022-04-12)


### Bug fixes

* **types:** Correct `defaultProps` key ([a5778f7](https://github.com/MorevM/vue-transitions/commit/a5778f77d5f55fcdf93f20f71cc549a1cc803541))### [2.1.1](https://github.com/MorevM/vue-transitions/compare/v2.1.0...v2.1.1) (2022-04-12)


### Chores

* bump @babel/plugin-transform-modules-commonjs ([#18](https://github.com/MorevM/vue-transitions/issues/18)) ([97b33a9](https://github.com/MorevM/vue-transitions/commit/97b33a9ce1270fd3c59388d1421c86600a85cca4))
* bump @morev/eslint-config from 10.0.3 to 11.0.0 ([#14](https://github.com/MorevM/vue-transitions/issues/14)) ([15f2a1c](https://github.com/MorevM/vue-transitions/commit/15f2a1c9cccbeed9c6918a2cf7acce12afe50bf2))
* bump @morev/helpers from 0.8.1 to 0.9.0 ([#17](https://github.com/MorevM/vue-transitions/issues/17)) ([0f07828](https://github.com/MorevM/vue-transitions/commit/0f07828a6834e1dccb8e0ad46dc3e1c6c954e462))
* bump eslint from 8.12.0 to 8.13.0 ([#16](https://github.com/MorevM/vue-transitions/issues/16)) ([e234244](https://github.com/MorevM/vue-transitions/commit/e23424469b79d3c2653b12a477cc4b13f6c9424a))
* bump sass from 1.49.11 to 1.50.0 ([#13](https://github.com/MorevM/vue-transitions/issues/13)) ([17aa796](https://github.com/MorevM/vue-transitions/commit/17aa7960b16971c3d8c2dfb05052d8bea0176c29))## [2.1.0](https://github.com/MorevM/vue-transitions/compare/v2.0.2...v2.1.0) (2022-04-12)


### Features

* Add types for plugin options ([6147a2a](https://github.com/MorevM/vue-transitions/commit/6147a2a3b241fdc36ec3b9cac52612c0f053c79e))
* Change default `easing` value ([45cb956](https://github.com/MorevM/vue-transitions/commit/45cb956b713f614a4e251fda29b5804452df4912))
* Plugin options to customize component names / default props ([78eb79c](https://github.com/MorevM/vue-transitions/commit/78eb79c1089618026430d887d2d98814e77b88fd))


### Chores

* bump @babel/plugin-transform-modules-commonjs ([#18](https://github.com/MorevM/vue-transitions/issues/18)) ([a4fe306](https://github.com/MorevM/vue-transitions/commit/a4fe306ae37cba4601df505fa378a54fcc6c0f65))
* bump @morev/eslint-config from 10.0.3 to 11.0.0 ([#14](https://github.com/MorevM/vue-transitions/issues/14)) ([881a048](https://github.com/MorevM/vue-transitions/commit/881a048d80ce5071c3df75bc4ebad0f450b1f89d))
* bump @morev/helpers from 0.8.1 to 0.9.0 ([#17](https://github.com/MorevM/vue-transitions/issues/17)) ([8ca3bfa](https://github.com/MorevM/vue-transitions/commit/8ca3bfabb82e5d20f6d5f3699d0865445f68b8b5))
* bump eslint from 8.12.0 to 8.13.0 ([#16](https://github.com/MorevM/vue-transitions/issues/16)) ([d79de2b](https://github.com/MorevM/vue-transitions/commit/d79de2bc9839d68496c2c0725a21ef619bc282c0))
* bump sass from 1.49.11 to 1.50.0 ([#13](https://github.com/MorevM/vue-transitions/issues/13)) ([5dff196](https://github.com/MorevM/vue-transitions/commit/5dff1961024a62553ef8307f49a01c75887a4b08))
* Treat `@morev/helpers` as external dependency ([77ec89c](https://github.com/MorevM/vue-transitions/commit/77ec89c1fb6f56c81dd6f348917a825632fb208f))
* Update rest dependencies ([7d6180c](https://github.com/MorevM/vue-transitions/commit/7d6180cd15a7e7f13379f1b6d7ba75c3f4a35eb0))


### Bug fixes

* Shared default `axis` prop value for `transition-expand` ([cd23e85](https://github.com/MorevM/vue-transitions/commit/cd23e857add9eb6839a24c595d51e70954b47738))


### Documentation

* Fix `move-duration` type ([a6704e8](https://github.com/MorevM/vue-transitions/commit/a6704e8cd7a5387e872bf1ffcc74203612bc198b))### [2.0.2](https://github.com/MorevM/vue-transitions/compare/v2.0.1...v2.0.2) (2022-04-08)


### CI improvements

* Remove mentions of workspaces before publishing ([8e48f2f](https://github.com/MorevM/vue-transitions/commit/8e48f2fdf6b6a828af0281e7c75119ddb8a78454))


### Refactoring

* Better `bin` command names ([465d823](https://github.com/MorevM/vue-transitions/commit/465d8237f67423201f5bccda0d50d464b41cb49e))


### Documentation

* Add note about version switching ([31afd94](https://github.com/MorevM/vue-transitions/commit/31afd94fbee7199d29cd4290e099274c1794b612))### [2.0.1](https://github.com/MorevM/vue-transitions/compare/v2.0.0...v2.0.1) (2022-04-08)


### CI improvements

* Explicit call of `prepack` script before publising ([fb56a11](https://github.com/MorevM/vue-transitions/commit/fb56a11a3ae88232cda4aab9d670fa01bda56ce5))## [2.0.0](https://github.com/MorevM/vue-transitions/compare/v1.1.0...v2.0.0) (2022-04-08)


### ⚠ BREAKING CHANGES

* Build mechanics have changed significantly with the introduction of the version for Vue 3.
Although there shouldn't be any problems (the default export should work the same as before), the update is marked as a major to avoid embarrassment.

### Features

* Vue 3 version of components ([c094554](https://github.com/MorevM/vue-transitions/commit/c094554797d3025c9a3f6da2e0ae0ae303d396de))


### Documentation

* Correct playground config `base` to fit GH pages ([98ff165](https://github.com/MorevM/vue-transitions/commit/98ff1654392d856bd4f6ee76c526a8780a15fa32))
* Fix playground `offset` control ([0a3e3dd](https://github.com/MorevM/vue-transitions/commit/0a3e3ddf1055657760a16ddee712da5e27570083))
* Update `README.md` ([230be83](https://github.com/MorevM/vue-transitions/commit/230be83c2edaabbf1348756b9ff6fecc06750d87))


### Tests

* Rename `validators` directory ([fb61dfe](https://github.com/MorevM/vue-transitions/commit/fb61dfe3cfea45bc450234b526a41aef552fde91))


### Chores

* bump release-it from 14.13.1 to 14.14.0 ([#11](https://github.com/MorevM/vue-transitions/issues/11)) ([ed9295d](https://github.com/MorevM/vue-transitions/commit/ed9295d12626d38d3e54ee30ef32f95226a6093d))
* bump sass from 1.49.9 to 1.49.11 ([#12](https://github.com/MorevM/vue-transitions/issues/12)) ([721ee2a](https://github.com/MorevM/vue-transitions/commit/721ee2af3b122fec6765db1a248d84ba076737cb))
* bump vite from 2.8.6 to 2.9.1 ([#10](https://github.com/MorevM/vue-transitions/issues/10)) ([7419f16](https://github.com/MorevM/vue-transitions/commit/7419f166695f152d621aa2346da37a7f0c2646ef))
* **vscode:** Add setting to validate `json` files ([9f7c13c](https://github.com/MorevM/vue-transitions/commit/9f7c13cf074368c2b23c2accc9b9ea3f37029d3b))## [1.1.0](https://github.com/MorevM/vue-transitions/compare/v1.0.0...v1.1.0) (2022-03-27)


### Features

* Playground is done ([91715de](https://github.com/MorevM/vue-transitions/commit/91715dea3e7f64240f33705f1f642bab09a13231))
* Respect the existing element opacity during expand ([496a17c](https://github.com/MorevM/vue-transitions/commit/496a17c9183a53d90ea967b39049c4f98ddb824e))


### Refactoring

* More safe `setMoveDuration` ([e7f2028](https://github.com/MorevM/vue-transitions/commit/e7f2028e57b617c6699f2508b54fac3e004fd6d2))


### Bug fixes

* Add `transform` transition-property to `expand` transition ([cbb94f1](https://github.com/MorevM/vue-transitions/commit/cbb94f1f84ab72a6e4c35be4ec115f369f899a73))
* Correct order of style actions, refactoring the code ([355bffe](https://github.com/MorevM/vue-transitions/commit/355bffe533f45af00fb7100de048740b0196803a))
* Correct work with percentage value in `transition-slide` ([bb821aa](https://github.com/MorevM/vue-transitions/commit/bb821aae7dce3b32224e9b79bfb9b3d4f3104417))
* Set `important` flag to all style transformations ([368c139](https://github.com/MorevM/vue-transitions/commit/368c139c813f67838306d18063f65b0f3fecf19d))


### CI improvements

* Add playground publish to GH pages ([27b0927](https://github.com/MorevM/vue-transitions/commit/27b09274c0dd9e3f0a59b3c54427adfeed510519))


### Chores

* Add `dependabot` ([f9b59a9](https://github.com/MorevM/vue-transitions/commit/f9b59a93ada5b6439fe7fd78d7dead07037e37c2))
* bump @morev/commitlint-config from 0.1.0 to 0.1.1 ([#5](https://github.com/MorevM/vue-transitions/issues/5)) ([9d03fc5](https://github.com/MorevM/vue-transitions/commit/9d03fc5eb80bfb84205214ba568bf44983fccc3b))
* bump @morev/eslint-config from 10.0.2 to 10.0.3 ([#2](https://github.com/MorevM/vue-transitions/issues/2)) ([ccf2108](https://github.com/MorevM/vue-transitions/commit/ccf21087da7b61663b9ab1602cfc0be60c1b2929))
* bump @morev/helpers from 0.8.0 to 0.8.1 ([#3](https://github.com/MorevM/vue-transitions/issues/3)) ([1d08a8d](https://github.com/MorevM/vue-transitions/commit/1d08a8dd62da2a6fcf75f2db7d62aae6d3bc00c2))
* bump @morev/stylelint-config from 1.0.2 to 1.0.3 ([#9](https://github.com/MorevM/vue-transitions/issues/9)) ([a0e6226](https://github.com/MorevM/vue-transitions/commit/a0e6226aeb378659f69b17a0db2ef9d85afc625f))
* bump @morev/v-bem-transformer from 0.0.4 to 0.0.5 ([#7](https://github.com/MorevM/vue-transitions/issues/7)) ([e0b96b4](https://github.com/MorevM/vue-transitions/commit/e0b96b4196f295030efeb17c722456c9bc07d6d0))
* bump eslint from 8.11.0 to 8.12.0 ([#8](https://github.com/MorevM/vue-transitions/issues/8)) ([f3f95a3](https://github.com/MorevM/vue-transitions/commit/f3f95a3fc144abf45f544bcfc352937761c2591b))
* bump more-sass from 1.0.5 to 1.0.7 ([#6](https://github.com/MorevM/vue-transitions/issues/6)) ([b2f6422](https://github.com/MorevM/vue-transitions/commit/b2f64223baa3dfdb5f45f9b524b98e28f1b33a03))
* Separate Vite configs to make the playground ([d87703d](https://github.com/MorevM/vue-transitions/commit/d87703d3d854ec8407e39c33dd40f1804194fb47))
* Update `release-it` config to fit new `scripts` section ([96e32c4](https://github.com/MorevM/vue-transitions/commit/96e32c4d1794cfef38a649a0c0469fa53c8c0a8b))
* Update linters to skip playground lint ([267a0a4](https://github.com/MorevM/vue-transitions/commit/267a0a40b9a7dd3e6b6ac80cceaab3721f929283))
* Update VSCode project settings ([a437e6e](https://github.com/MorevM/vue-transitions/commit/a437e6e8dd4f4b2492e15b7166971be5389a5b43))## [1.0.0](https://github.com/MorevM/vue-transitions/compare/v0.0.2...v1.0.0) (2022-03-25)

⚠ BREAKING CHANGES:
* Prop `move-disable` was renamed to `no-disable`

### Features

* Add 'opacity' option ([dab173b](https://github.com/MorevM/vue-transitions/commit/dab173b437ddb977418b50b76404c3c5714983d5))
* Add 'scale' option for 'transition-scale' ([79ad99f](https://github.com/MorevM/vue-transitions/commit/79ad99f8be49d2423def31ec915f24694dc96fec))
* Add 'scale' option in playground ([71fc67a](https://github.com/MorevM/vue-transitions/commit/71fc67ab1997c9a7f9294d60c322722d1cdf0b42))
* Add VS Code settings ([6924927](https://github.com/MorevM/vue-transitions/commit/6924927ceddbb97457fcfbbceca75b4c361fa9bb))


### Documentation

* Appropriate changes ([43d6c96](https://github.com/MorevM/vue-transitions/commit/43d6c96a906eead6f7d5767d4ff5b8ddf342d2b3))


### Refactoring

* Change the 'move-disable' option to 'no-move' ([1740328](https://github.com/MorevM/vue-transitions/commit/1740328237e300c12b20aa442c53015ebd7a709f))
* Change the 'opacity' option to 'no-opacity' ([ec58daa](https://github.com/MorevM/vue-transitions/commit/ec58daab81d97f1e79d97f8c1bd31079517f5bc4))


### Bug fixes

* Add markdown files to lint-staged settings ([8cb7713](https://github.com/MorevM/vue-transitions/commit/8cb7713892c5135bb45983eaca1b6c9fdcd5c8a8))


### Chores

* Deps update ([88f50eb](https://github.com/MorevM/vue-transitions/commit/88f50eb192582cf8e62111be966290d9b77b730f))
* Update linters + appropriate fixes ([0bce6dd](https://github.com/MorevM/vue-transitions/commit/0bce6dd2232cb2def2619fb001777af9f60faa13))### [0.0.2](https://github.com/MorevM/vue-transitions/compare/v0.0.1...v0.0.2) (2022-03-18)


### Bug fixes

* Add CSS file exports ([1a1dc50](https://github.com/MorevM/vue-transitions/commit/1a1dc50ff1dd31f8043002864bbe5224b31019ef))
* Correct initial transform of `transition-slide` ([141e1e5](https://github.com/MorevM/vue-transitions/commit/141e1e5fa0a3414dd47132bd381ca3837058c88d))### 0.0.1 (2022-03-18)
