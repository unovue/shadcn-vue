---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
source: apps/www/src/lib/registry/default/ui/radio-group 
primitive: https://www.radix-vue.com/components/radio-group.html
---

<ComponentPreview name="RadioGroupDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add radio-group
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
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'radix-vue'
import { ref } from 'vue'

const radioStateSingle = ref('default')
</script>

<template>
  <RadioGroupRoot
    v-model="radioStateSingle" class="flex flex-col gap-2.5" default-value="default"
    aria-label="View density"
  >
    <div class="flex items-center">
      <RadioGroupItem
        id="r1"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default" value="default"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </RadioGroupItem>
      <label class="text-white text-[15px] leading-none pl-[15px]" for="r1">
        Default
      </label>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
        id="r2"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default" value="comfortable"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </RadioGroupItem>
      <label class="text-white text-[15px] leading-none pl-[15px]" for="r2">
        Comfortable
      </label>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
        id="r3"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default" value="compact"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </RadioGroupItem>
      <label class="text-white text-[15px] leading-none pl-[15px]" for="r3">
        Compact
      </label>
    </div>
  </RadioGroupRoot>
</template>
```

### Update `tailwind.config.js` 

Add the following code into your `tailwind.config.js` file:

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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-one" value="option-one" />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-two" value="option-two" />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>
```