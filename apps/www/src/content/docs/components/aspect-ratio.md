---
title: Aspect Ratio
description: Displays content within a desired ratio.
source: apps/www/src/lib/registry/default/ui/aspect-ratio 
primitive: https://www.radix-vue.com/components/aspect-ratio.html
---


<ComponentPreview name="AspectRatioDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add aspect-ratio
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
import { AspectRatio } from 'radix-vue'
</script>

<template>
  <div class="shadow-blackA7 w-full sm:w-[300px] overflow-hidden rounded-md shadow-[0_2px_10px]">
    <AspectRatio :ratio="16 / 9">
      <img
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      >
    </AspectRatio>
  </div>
</template>
```

### Update `tailwind.config.js`

Add the following to your `tailwind.config.js` file:

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
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <div class="w-[450px]">
    <AspectRatio :ratio="16 / 9">
      <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80">
    </AspectRatio>
  </div>
</template>
```