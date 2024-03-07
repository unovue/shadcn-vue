---
title: Vite
description: Install and configure Vite.
---

<Steps>

### Create project

Start by creating a new Vue project using `vite`:

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue-ts
```

### Add Tailwind and its configuration

Install `tailwindcss` and its peer dependencies, then generate your `tailwind.config.js` and configure `postcss` plugins

<TabsMarkdown>
  <TabMarkdown title="vite.config">

  Vite already has [`postcss`](https://github.com/vitejs/vite/blob/main/packages/vite/package.json#L78) dependency so you don't have to install it again in your package.json

  ```bash
  npm install -D tailwindcss autoprefixer
  ```

  #### `vite.config`

  ```typescript {5,6,9-13}
  import path from "path"
  import { defineConfig } from "vite"
  import vue from "@vitejs/plugin-vue"

  import tailwind from "tailwindcss"
  import autoprefixer from "autoprefixer"

  export default defineConfig({
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
  ```

  </TabMarkdown>

  <TabMarkdown title="postcss.config.js">

  ```bash
  npm install -D tailwindcss autoprefixer postcss
  ```

  #### `postcss.config.js`

  ```js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```

  </TabMarkdown>
</TabsMarkdown>

### Edit tsconfig.json

Add the code below to the compilerOptions of your tsconfig.json so your app can resolve paths without error

```json {4-7}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

### Update vite.config.ts

Add the code below to the vite.config.ts so your app can resolve paths without error

```bash
# (so you can import "path" without error)
npm i -D @types/node
```

```typescript {15-19}
import path from "path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
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
