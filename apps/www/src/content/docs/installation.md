---
title: Installation
description: How to install dependencies and structure your app.
---

<script setup>
  import { Alert, AlertDescription } from "@/lib/registry/default/ui/alert";
</script>

Unlike the original [shadcn/ui](https://ui.shadcn.com) for React, where the full components can exist in a single file, components in this port are split into multiple files due to majority vote from [Vue community](https://twitter.com/zernonia/status/1694351679540580524) to use `SFC` rather than `h()` render function or `JSX`, so utilizing the CLI to add components will be the optimal approach.
 
 

The CLI will create a folder for _each_ component, which will sometimes just contain a single Vue file, and in other times, multiple files. Within each folder, there will be an `index.ts` file that exports the component(s), so you can import them from a single file.

For example, the Accordion component is split into four `.vue` files:

- `Accordion.vue`
- `AccordionContent.vue`
- `AccordionItem.vue`
- `AccordionTrigger.vue`

They can then be imported from the `accordion/index.ts` file like so:

```ts
import * as Accordion from '@/components/ui/accordion'

// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
```

Regardless of the import approach you take, the components will be tree-shaken by Rollup, so you don't have to worry about unused components being bundled into your app.

## New Project

<Steps>

### Create project

Use the Vue CLI to create a new project.

```bash
npm create vue@latest 
```

### Add Tailwind and its configuration

Install `tailwindcss` and its peer dependencies, then generate your `tailwind.config.js` and `postcss.config.js` files:

```bash
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

### Install dependencies

```bash
npm install
```

### Run the CLI

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite + Vue / Nuxt
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes (no)
```

### Edit tsconfig.json

By default your `tsconfig.json` for new project should be configured nicely. However, make sure the code below is added in the compilerOptions of your tsconfig.json so your app can resolve paths without error

```json 
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
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
  