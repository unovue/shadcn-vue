---
title: Hover Card
description: For sighted users to preview content available behind a link.
source: apps/www/src/lib/registry/default/ui/hover-card 
primitive: https://www.radix-vue.com/components/hover-card.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="HoverCardDemo" /> 

## Installation

```bash
npx shadcn-vue@latest add hover-card
``` 
## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}HoverCard,
  {{codeConfig.prefix}}HoverCardContent,
  {{codeConfig.prefix}}HoverCardTrigger,
} from '{{codeConfig.aliases.components}}/ui/hover-card'
</script>

<template>
  <{{codeConfig.prefix}}HoverCard>
    <{{codeConfig.prefix}}HoverCardTrigger>Hover</{{codeConfig.prefix}}HoverCardTrigger>
    <{{codeConfig.prefix}}HoverCardContent>
      The Vue Framework – created and maintained by @vuejs.
    </{{codeConfig.prefix}}HoverCardContent>
  </{{codeConfig.prefix}}HoverCard>
</template>
```
