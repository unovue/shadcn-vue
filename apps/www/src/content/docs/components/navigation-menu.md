---
title: Navigation Menu
description: A collection of links for navigating websites.
source: apps/www/src/lib/registry/default/ui/navigation-menu 
primitive: https://www.radix-vue.com/components/navigation-menu.html
---

<ComponentPreview name="NavigationMenuDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add navigation-menu
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

Add the following code into your `NavigationMenuListItem.vue` file:

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import NavigationMenuListItem from './NavigationMenuListItem.vue'

function handleClick() {
  alert('hello!')
}

const currentTrigger = ref('')
</script>

<template>
  <NavigationMenuRoot v-model="currentTrigger" class="relative z-[1] flex w-full justify-center">
    <NavigationMenuList class="center shadow-blackA7 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Learn
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
        >
          <ul class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
            <li class="row-span-3 grid">
              <NavigationMenuLink as-child>
                <a
                  class="focus:shadow-green7 from-green9 to-teal9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                  href="/"
                >
                  <img class="w-16" src="/logo.svg">
                  <div class="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">Radix Primitives</div>
                  <p class="text-mauve4 text-[14px] leading-[1.3]">Unstyled, accessible components for React.</p>
                </a>
              </NavigationMenuLink>
            </li>

            <NavigationMenuListItem href="https://stitches.dev/" title="Stitches">
              CSS-in-JS with best-in-class developer experience.
            </NavigationMenuListItem>
            <NavigationMenuListItem href="/colors" title="Colors">
              Beautiful, thought-out palettes with auto dark mode.
            </NavigationMenuListItem>
            <NavigationMenuListItem href="https://icons.radix-ui.com/" title="Icons">
              A crisp set of 15x15 icons, balanced and consistent.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Overview
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="absolute top-0 left-0 w-full sm:w-auto">
          <ul class="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
            <NavigationMenuListItem title="Introduction" href="/docs/primitives/overview/introduction">
              Build high-quality, accessible design systems and web apps.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Getting started" href="/docs/primitives/overview/getting-started">
              A quick tutorial to get you up and running with Radix Primitives.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Styling" href="/docs/primitives/guides/styling">
              Unstyled and compatible with any styling solution.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Animation" href="/docs/primitives/guides/animation">
              Use CSS keyframes or any animation library of your choice.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Accessibility" href="/docs/primitives/overview/accessibility">
              Tested in a range of browsers and assistive technologies.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Releases" href="/docs/primitives/overview/releases">
              Radix Primitives releases and their changelogs.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="text-grass11 hover:bg-green3 focus:shadow-green7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
          href="https://github.com/radix-vue"
        >
          Github
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
        class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template>
```

Add the following code into your `index.vue` file:

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import NavigationMenuListItem from './NavigationMenuListItem.vue'

function handleClick() {
  alert('hello!')
}

const currentTrigger = ref('')
</script>

<template>
  <NavigationMenuRoot v-model="currentTrigger" class="relative z-[1] flex w-full justify-center">
    <NavigationMenuList class="center shadow-blackA7 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Learn
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
        >
          <ul class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
            <li class="row-span-3 grid">
              <NavigationMenuLink as-child>
                <a
                  class="focus:shadow-green7 from-green9 to-teal9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                  href="/"
                >
                  <img class="w-16" src="/logo.svg">
                  <div class="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">Radix Primitives</div>
                  <p class="text-mauve4 text-[14px] leading-[1.3]">Unstyled, accessible components for React.</p>
                </a>
              </NavigationMenuLink>
            </li>

            <NavigationMenuListItem href="https://stitches.dev/" title="Stitches">
              CSS-in-JS with best-in-class developer experience.
            </NavigationMenuListItem>
            <NavigationMenuListItem href="/colors" title="Colors">
              Beautiful, thought-out palettes with auto dark mode.
            </NavigationMenuListItem>
            <NavigationMenuListItem href="https://icons.radix-ui.com/" title="Icons">
              A crisp set of 15x15 icons, balanced and consistent.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Overview
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="absolute top-0 left-0 w-full sm:w-auto">
          <ul class="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
            <NavigationMenuListItem title="Introduction" href="/docs/primitives/overview/introduction">
              Build high-quality, accessible design systems and web apps.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Getting started" href="/docs/primitives/overview/getting-started">
              A quick tutorial to get you up and running with Radix Primitives.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Styling" href="/docs/primitives/guides/styling">
              Unstyled and compatible with any styling solution.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Animation" href="/docs/primitives/guides/animation">
              Use CSS keyframes or any animation library of your choice.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Accessibility" href="/docs/primitives/overview/accessibility">
              Tested in a range of browsers and assistive technologies.
            </NavigationMenuListItem>
            <NavigationMenuListItem title="Releases" href="/docs/primitives/overview/releases">
              Radix Primitives releases and their changelogs.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="text-grass11 hover:bg-green3 focus:shadow-green7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
          href="https://github.com/radix-vue"
        >
          Github
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
        class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template>
```

### Update `tailwind.config.js` file:

Add the following into your `tailwind.config.js` file:

```ts
const plugin = require('tailwindcss/plugin')
const { blackA, green, grass, teal } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...teal,
      },
    },
    keyframes: {
      enterFromRight: {
        from: { opacity: 0, transform: 'translateX(200px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      enterFromLeft: {
        from: { opacity: 0, transform: 'translateX(-200px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      exitToRight: {
        from: { opacity: 1, transform: 'translateX(0)' },
        to: { opacity: 0, transform: 'translateX(200px)' },
      },
      exitToLeft: {
        from: { opacity: 1, transform: 'translateX(0)' },
        to: { opacity: 0, transform: 'translateX(-200px)' },
      },
      scaleIn: {
        from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
        to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
      },
      scaleOut: {
        from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    },
  },
  animation: {
    scaleIn: 'scaleIn 200ms ease',
    scaleOut: 'scaleOut 200ms ease',
    fadeIn: 'fadeIn 200ms ease',
    fadeOut: 'fadeOut 200ms ease',
    enterFromLeft: 'enterFromLeft 250ms ease',
    enterFromRight: 'enterFromRight 250ms ease',
    exitToLeft: 'exitToLeft 250ms ease',
    exitToRight: 'exitToRight 250ms ease',
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: value => ({
          perspective: value,
        }),
      })
    }),
  ],
}
```


</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```