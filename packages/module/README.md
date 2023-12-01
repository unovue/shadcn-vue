<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Shadcn Nuxt
- Package name: shadcn-nuxt
- Description: My new Nuxt module
-->

# Shadcn Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Shadcn Vue module for Nuxt. 

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/radix-vue/shadcn-vue?file=playground%2Fapp.vue) -->
- [📖 &nbsp;Documentation](https://www.shadcn-vue.com/docs/installation/nuxt.html)

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ Auto-import correct and relevant components
- more to come...

## Quick Setup

1. Add `shadcn-nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D shadcn-nuxt

# Using yarn
yarn add --dev shadcn-nuxt

# Using npm
npm install --save-dev shadcn-nuxt
```

2. Add `shadcn-nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
```

That's it! You can now use Shadcn Nuxt in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/shadcn-nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/shadcn-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/shadcn-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/shadcn-nuxt

[license-src]: https://img.shields.io/npm/l/shadcn-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/shadcn-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
