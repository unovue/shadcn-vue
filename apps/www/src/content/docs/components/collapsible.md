---
title: Collapsible
description: An interactive component which expands/collapses a panel.
source: apps/www/src/lib/registry/default/ui/collapsible
primitive: https://www.radix-vue.com/components/collapsible.html
---

<ComponentPreview name="CollapsibleDemo" />

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add collapsible
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
    },
  },
}
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects. No attribution
      required.
    </CollapsibleContent>
  </Collapsible>
</template>
```
