---
title: Scroll-area
description: Augments native scroll functionality for custom, cross-browser styling.
source: apps/www/src/lib/registry/default/ui/scroll-area 
primitive: https://www.radix-vue.com/components/scroll-area.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="ScrollAreaDemo" /> 

## Installation


```bash
npx shadcn-vue@latest add scroll-area
```
## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}ScrollArea } from '{{codeConfig.aliases.components}}/ui/scroll-area'
</script>

<template>
  <{{codeConfig.prefix}}ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then, one day, the people of the kingdom discovered that the jokes left by
    Jokester were so funny that they couldn't help but laugh. And once they
    started laughing, they couldn't stop.
  </{{codeConfig.prefix}}ScrollArea>
</template>
```

## Examples

### Horizontal Scrolling

<ComponentPreview name="ScrollAreaHorizontalDemo" />

