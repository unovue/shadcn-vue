---
title: Popover
description: Displays rich content in a portal, triggered by a button.
source: apps/www/src/lib/registry/default/ui/popover 
primitive: https://www.radix-vue.com/components/popover.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>



<ComponentPreview name="PopoverDemo" /> 

## Installation


```bash
npx shadcn-vue@latest add popover
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Popover,
  {{codeConfig.prefix}}PopoverContent,
  {{codeConfig.prefix}}PopoverTrigger,
} from '{{codeConfig.aliases.components}}/ui/popover'
</script>

<template>
  <{{codeConfig.prefix}}Popover>
    <{{codeConfig.prefix}}PopoverTrigger>
      Open popover
    </{{codeConfig.prefix}}PopoverTrigger>
    <{{codeConfig.prefix}}PopoverContent>...</{{codeConfig.prefix}}PopoverContent>
  </{{codeConfig.prefix}}Popover>
</template>
```
