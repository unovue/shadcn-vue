---
title: Toggle
description: A two-state button that can be either on or off.
source: apps/www/src/lib/registry/default/ui/toggle 
primitive: https://www.radix-vue.com/components/toggle.html
---

<ComponentPreview name="ToggleDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue

npm install --save-dev @iconify/vue
```

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { Toggle } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const toggleState = ref(false)
</script>

<template>
  <Toggle
    v-model:pressed="toggleState" aria-label="Toggle italic"
    class="hover:bg-green3 text-mauve11 data-[state=on]:bg-green6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
  >
    <Icon icon="radix-icons:font-italic" class="w-[15px] h-[15px]" />
  </Toggle>
</template>
```

### Update `tailwind.config.js`

Add the following code into your `tailwind.config.js` file:

```ts
const { blackA, green, grass, mauve } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
      },
    },
  },
  plugins: [],
}
```

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```