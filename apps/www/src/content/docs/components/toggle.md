---
title: Toggle
description: A two-state button that can be either on or off.
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/toggle 
primitive: https://www.radix-vue.com/components/toggle.html
---

<ComponentPreview name="ToggleDemo" >

<<< ../../../lib/registry/default/examples/ToggleDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add toggle
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
import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```