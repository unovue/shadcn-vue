---
title: Popover
description: Displays rich content in a portal, triggered by a button.
source: apps/www/registry/default/ui/popover
primitive: https://www.reka-ui.com/docs/components/popover.html
---

<ComponentPreview name="PopoverDemo" />

## Installation

```bash
npx shadcn-vue@latest add popover
```

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
    <PopoverContent>
      Some popover content
    </PopoverContent>
  </Popover>
</template>
```
