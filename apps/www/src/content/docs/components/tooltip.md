---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
source: apps/www/src/lib/registry/default/ui/tooltip 
primitive: https://www.radix-vue.com/components/tooltip.html
---

<ComponentPreview name="TooltipDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add tooltip
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
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger
        class="text-grass11 shadow-blackA7 hover:bg-green3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon icon="radix-icons:plus" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          as-child
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-grass11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          :side-offset="5"
        >
          <ul>
            Add to library
            <TooltipArrow class="fill-white" size="8" />
          </ul>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```