---
title: Button
description: Displays a button or a component that looks like a button.
---


<ComponentPreview name="ButtonDemo"  >

<<< ../../../lib/registry/default/examples/ButtonDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add button
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
import { Button } from '@/lib/registry/default/ui/button'
</script>

<template>
  <Button>Button</Button>
</template>
```