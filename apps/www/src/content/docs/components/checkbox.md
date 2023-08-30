---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/checkbox 
primitive: https://www.radix-vue.com/components/checkbox.html
---


<ComponentPreview name="CheckboxDemo"  >

<<< ../../../lib/registry/default/examples/CheckboxDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add checkbox
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
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
</script>

<template>
  <Checkbox id="terms" />
</template>
```