---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/checkbox 
primitive: https://www.radix-vue.com/components/checkbox.html
---


<ComponentPreview name="CheckboxDemo"  /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add checkbox
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
import { ref } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { Icon } from '@iconify/vue'

const checkboxOne = ref(true)
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
      <CheckboxRoot
        v-model="checkboxOne"
        class="shadow-blackA7 hover:bg-green3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus-within:shadow-[0_0_0_2px_black]"
      >
        <CheckboxIndicator class="bg-white h-full w-full rounded flex items-center justify-center">
          <Icon icon="radix-icons:check" class="h-3.5 w-3.5 text-grass11" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="select-none text-white">Accept terms and conditions.</span>
    </label>
  </div>
</template>
```

### Update `tailwind.config.js`

Add the following to your tailwind.config.js file:

```ts
const { blackA, green } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
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
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox id="terms" />
</template>
```

## Examples

### With text

<ComponentPreview name="CheckboxDisabled"  /> 