--- 
title: Collapsible
description: An interactive component which expands/collapses a panel.
source: apps/www/src/lib/registry/default/ui/collapsible 
primitive: https://www.radix-vue.com/components/collapsible.html
---


<ComponentPreview name="CollapsibleDemo" /> 

## Installation

 
```bash
npx shadcn-vue@latest add collapsible
``` 

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