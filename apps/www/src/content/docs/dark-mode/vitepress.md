---
title: Vite
description: Adding dark mode to your vite app.
---

## Dark mode

<Steps>

### Install Dependencies

```bash
npm install @vueuse/core
```

Optional, to include icons for theme button.
```bash
npm install -D @iconify/vue @iconify-json/radix-icons
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

We're using [`useToggle`](https://vueuse.org/shared/useToggle/) from [`@vueuse/core`](https://vueuse.org/core/).
> A boolean switcher with utility functions.

```vue
<script setup lang="ts">
import { useData } from 'vitepress'
import { useToggle } from '@vueuse/core'
import { Button } from '@/lib/registry/default/ui/button'

const { frontmatter, isDark } = useData()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline">
    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
```

</Steps>
