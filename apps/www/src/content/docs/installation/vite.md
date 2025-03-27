---
title: Vite
description: Install and configure Vite.
---

<Callout class="bg-blue-50 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mt-0 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900">

  **Note:** The following guide is for Tailwind v4. If you are using Tailwind
  v3, use `shadcn-vue@1.0.3`.

</Callout>

<Steps>

### Create project

Start by creating a new Vue project using `vite`:

```bash
npm create vite@latest my-vue-app -- --template vue-ts
```

### Add Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with the following:

```css title="src/index.css"
@import "tailwindcss";
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
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
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

You will be asked a few questions to configure `components.json`.

```txt
Which color would you like to use as base color? › Neutral
```

### Add Components

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
