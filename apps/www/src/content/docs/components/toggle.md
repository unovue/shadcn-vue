---
title: Toggle
description: A two-state button that can be either on or off.
source: apps/www/src/lib/registry/default/ui/toggle 
primitive: https://www.radix-vue.com/components/toggle.html
---

<ComponentPreview name="ToggleDemo" /> 



## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add toggle
```
</template>

<template #Manual>

<Steps>

### Install the following dependencies:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/toggle/Toggle.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```