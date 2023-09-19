---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/switch 
primitive: https://www.radix-vue.com/components/switch.html
---

<ComponentPreview name="SwitchDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add switch
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
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { ref } from 'vue'

const switchState = ref(false)
</script>

<template>
  <div class="flex gap-2 items-center">
    <label className="text-white text-[15px] leading-none pr-[15px] select-none" for="airplane-mode">
      Airplane mode
    </label>
    <SwitchRoot
      id="airplane-mode"
      v-model:checked="switchState"
      class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-black/50 shadow-sm rounded-full relative data-[state=checked]:bg-black cursor-default"
    >
      <SwitchThumb
        class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </SwitchRoot>
  </div>
</template>
```

### Update `tailwind.config.js`

Add the following code into your `tailwind.config.js` file:

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {},
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
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <Switch />
</template>
```