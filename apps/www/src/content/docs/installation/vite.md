---
title: Vite
description: Install and configure Vite.
---

<Steps>

### Create project

Start by creating a new Vue project using `vite`:

```bash
npm create vite@latest my-vue-app -- --template vue-ts
```

### Add Tailwind and its configuration

Install `tailwindcss` and its peer dependencies, then generate your `tailwind.config.js` and `postcss` plugins:

```bash
npm install -D tailwindcss autoprefixer
```

```bash
npx tailwindcss init
```

Add this import header in your main css file, `src/assets/index.css` in our case:

```css:line-numbers {1-3}
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... */
```

Configure the tailwind template paths in `tailwind.config.js`:

```js {3}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,js,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Edit tsconfig.json file

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited.
Add the `baseUrl` and `paths` properties to the `compilerOptions` section of the `tsconfig.json` and
`tsconfig.app.json` files:

```ts:line-numbers {11-16}
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Edit tsconfig.app.json file

Add the following code to the `tsconfig.app.json` file to resolve paths, for your IDE:

```ts:line-numbers {4-9}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Update vite.config.ts

Add the following code to the vite.config.ts so your app can resolve paths without error:

```bash
npm install -D @types/node
```

```typescript
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```vue {2,7}
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>
