---
title: Input
description: Displays a form input field or a component that looks like an input field.
---


<ComponentPreview name="InputDemo" class="[&_input]:max-w-xs" >

<<< ../../../lib/registry/default/examples/InputDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add input
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
import { Input } from '@/lib/registry/default/ui/input'
</script>

<template>
  <Input />
</template>
```