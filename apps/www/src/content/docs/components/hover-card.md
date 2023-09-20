---
title: Hover Card
description: For sighted users to preview content available behind a link.
source: apps/www/src/lib/registry/default/ui/hover-card 
primitive: https://www.radix-vue.com/components/hover-card.html
---


<ComponentPreview name="HoverCardDemo" /> 


<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add hover-card
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
import { ref } from 'vue'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'radix-vue'

const hoverState = ref(false)
</script>

<template>
  <HoverCardRoot v-model:open="hoverState">
    <HoverCardTrigger
      class="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
      href="https://twitter.com/radix_ui"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        class="block h-[45px] w-[45px] rounded-full"
        src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
        alt="Radix UI"
      >
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        :side-offset="5"
      >
        <div class="flex flex-col gap-[7px]">
          <img
            class="block h-[60px] w-[60px] rounded-full"
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            alt="Radix UI"
          >
          <div class="flex flex-col gap-[15px]">
            <div>
              <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                Radix
              </div>
              <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                @radix_ui
              </div>
            </div>
            <div class="text-mauve12 m-0 text-[15px] leading-[1.5]">
              Components, icons, colors, and templates for building high-quality, accessible UI. Free and open-source.
            </div>
            <div class="flex gap-[15px]">
              <div class="flex gap-[5px]">
                <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                  0
                </div>
                <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  Following
                </div>
              </div>
              <div class="flex gap-[5px]">
                <div class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                  2,900
                </div>
                <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  Followers
                </div>
              </div>
            </div>
          </div>
        </div>

        <HoverCardArrow class="fill-white" size="8" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
```

### Update `tailwind.config.js`

Add the following to your `tailwind.config.js` file:

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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by @vuejs.
    </HoverCardContent>
  </HoverCard>
</template>
```