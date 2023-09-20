---
title: Popover
description: Displays rich content in a portal, triggered by a button.
source: apps/www/src/lib/registry/default/ui/popover 
primitive: https://www.radix-vue.com/components/popover.html
---


<ComponentPreview name="PopoverDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add popover
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

Add the following code into your project:

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger
      class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
      aria-label="Update dimensions"
    >
      <Icon icon="radix-icons:mixer-horizontal" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="5"
        class="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col gap-2.5">
          <p class="text-mauve12 text-[15px] leading-[19px] font-semibold mb-2.5">
            Dimensions
          </p>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="width"> Width </label>
            <input
              id="width"
              class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="100%"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="maxWidth"> Max. width </label>
            <input
              id="maxWidth"
              class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="300px"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="height"> Height </label>
            <input
              id="height"
              class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="25px"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="maxHeight"> Max. height </label>
            <input
              id="maxHeight"
              class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="none"
            >
          </fieldset>
        </div>
        <PopoverClose
          class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 absolute top-[5px] right-[5px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
          aria-label="Close"
        >
          <Icon icon="radix-icons:cross-2" />
        </PopoverClose>
        <PopoverArrow class="fill-white" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
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
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger>
      Open popover
    </PopoverTrigger>
    <PopoverContent />
  </Popover>
</template>
```