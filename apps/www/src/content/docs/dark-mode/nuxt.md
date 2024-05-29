---
title: Nuxt
description: Adding dark mode to your nuxt app.
---

## Dark mode

<Steps>

### Install Dependencies

```bash
npm install -D @nuxtjs/color-mode
```

Then, add `@nuxtjs/color-mode` to the modules section of your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useColorMode`](https://color-mode.nuxtjs.org/#usage) from [`Nuxt Color Mode`](https://color-mode.nuxtjs.org/).

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>
