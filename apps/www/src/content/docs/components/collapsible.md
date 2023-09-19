--- 
title: Collapsible
description: An interactive component which expands/collapses a panel.
source: apps/www/src/lib/registry/default/ui/collapsible 
primitive: https://www.radix-vue.com/components/collapsible.html
---


<ComponentPreview name="CollapsibleDemo" /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add collapsible
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue

npm install --save-dev @iconify/vue
```

### Copy and paste the following code into your project:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'radix-vue'
import { Icon } from '@iconify/vue'

const rootOpen = ref(false)
const rootDisabled = ref(false)
const open = ref(false)
</script>

<template>
  <CollapsibleRoot v-model:open="rootOpen" class="w-[300px]" :disabled="rootDisabled">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span class="text-white text-[15px] leading-[25px]"> @peduarte starred 3 repos </span>
      <CollapsibleTrigger
        class="cursor-default rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-green3 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon v-if="rootOpen" icon="radix-icons:cross-2" class="h-3.5 w-3.5" />
        <Icon v-else icon="radix-icons:row-spacing" class="h-3.5 w-3.5" />
      </CollapsibleTrigger>
    </div>

    <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
      <span class="text-grass11 text-[15px] leading-[25px]">@radix-vue/radix-vue</span>
    </div>

    <CollapsibleContent>
      <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span class="text-grass11 text-[15px] leading-[25px]">@vuejs/core</span>
      </div>
      <div class="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span class="text-grass11 text-[15px] leading-[25px]">@radix-ui/primitives</span>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```ts
const { blackA, green, grass } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
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
import { ref } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects. No attribution
      required.
    </CollapsibleContent>
  </Collapsible>
</template>
```