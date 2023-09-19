---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: apps/www/src/lib/registry/default/ui/progress 
primitive: https://www.radix-vue.com/components/progress.html
---

<ComponentPreview name="ProgressDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add progress
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const progressValue = ref(10)

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = 66), 500)
  return () => clearTimeout(timer)
})
</script>

<template>
  <ProgressRoot
    v-model="progressValue"
    class="relative overflow-hidden bg-blackA9 rounded-full w-full sm:w-[300px] h-4 sm:h-5"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      class="bg-white rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
</template>
```

### Update `tailwind.config.js`

Add the following code into your `tailwind.config.js` file:

```ts
const { blackA } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
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
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```