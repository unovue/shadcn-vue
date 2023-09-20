---
title: Slider
description: An input where the user selects a value from within a given range.
source: apps/www/src/lib/registry/default/ui/slider 
primitive: https://www.radix-vue.com/components/slider.html
---

<ComponentPreview name="SliderDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add slider
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const sliderValue = ref([50])
</script>

<template>
  <SliderRoot
    v-model="sliderValue" class="relative flex items-center select-none touch-none w-[200px] h-5" :max="100"
    :step="1"
  >
    <SliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
      <SliderRange class="absolute bg-white rounded-full h-full" />
    </SliderTrack>
    <SliderThumb
      class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
      aria-label="Volume"
    />
  </SliderRoot>
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
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    :default-value="[33]" :max="100" :step="1"
  />
</template>
```