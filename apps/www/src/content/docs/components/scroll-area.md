---
title: Scroll-area
description: Augments native scroll functionality for custom, cross-browser styling.
source: apps/www/src/lib/registry/default/ui/scroll-area 
primitive: https://www.radix-vue.com/components/scroll-area.html
---

<ComponentPreview name="ScrollAreaDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add scroll-area
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
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
</script>

<template>
  <ScrollAreaRoot
    class="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-white"
    style="--scrollbar-size: 10px"
  >
    <ScrollAreaViewport class="w-full h-full rounded">
      <div class="py-[15px] px-5">
        <div class="text-grass11 text-[15px] leading-[18px] font-semibold">
          Tags
        </div>
        <div
          v-for="tag in tags"
          :key="tag"
          class="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
        >
          {{ tag }}
        </div>
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollAreaThumb
        class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<style>
/* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
.ScrollAreaThumb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}
</style>
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
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then, one day, the people of the kingdom discovered that the jokes left by
    Jokester were so funny that they couldn't help but laugh. And once they
    started laughing, they couldn't stop.
  </ScrollArea>
</template>
```