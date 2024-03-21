---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
source: apps/www/src/lib/registry/default/ui/tooltip
primitive: https://www.radix-vue.com/components/tooltip.html
---

<ComponentPreview name="TooltipDemo" />

## Installation

```bash
npx shadcn-vue@latest add tooltip
```

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
