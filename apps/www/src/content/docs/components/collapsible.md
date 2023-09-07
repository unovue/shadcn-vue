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

<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/registry/default/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
  >
    <CollapsibleTrigger>
      Trigger
    </CollapsibleTrigger>
    <CollapsibleContent>
      Content
    </CollapsibleContent>
  </Collapsible>
</template>
```