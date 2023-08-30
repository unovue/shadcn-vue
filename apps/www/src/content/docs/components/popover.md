---
title: Popover
description: Displays rich content in a portal, triggered by a button.
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/popover 
primitive: https://www.radix-vue.com/components/popover.html
---


<ComponentPreview name="PopoverDemo" >

<<< ../../../lib/registry/default/examples/PopoverDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add popover
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger>
      Open popover
    </PopoverTrigger>
    <PopoverContent />
  </Popover>
</template>
```