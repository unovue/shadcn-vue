---
title: Tooltip
description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
source: apps/www/src/lib/registry/default/ui/tooltip 
primitive: https://www.radix-vue.com/components/tooltip.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="TooltipDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add tooltip
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Tooltip,
  {{codeConfig.prefix}}TooltipContent,
  {{codeConfig.prefix}}TooltipProvider,
  {{codeConfig.prefix}}TooltipTrigger
} from '{{codeConfig.aliases.components}}/ui/tooltip'
</script>

<template>
  <{{codeConfig.prefix}}TooltipProvider>
    <{{codeConfig.prefix}}Tooltip>
      <{{codeConfig.prefix}}TooltipTrigger>Hover</{{codeConfig.prefix}}TooltipTrigger>
      <{{codeConfig.prefix}}TooltipContent>
        <p>Add to library</p>
      </{{codeConfig.prefix}}TooltipContent>
    </{{codeConfig.prefix}}Tooltip>
  </{{codeConfig.prefix}}TooltipProvider>
</template>
```
