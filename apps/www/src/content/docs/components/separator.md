---
title: Separator
description: Visually or semantically separates content.
source: apps/www/src/registry/default/ui/separator
primitive: https://www.reka-ui.com/docs/components/separator.html
---

<ComponentPreview name="SeparatorDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add separator
```
</template>

<template #Manual>

<Steps>

### Install the following dependency

```bash
npm install reka-ui
```

### Copy and paste the following code into your project

<<< @/registry/default/ui/separator/Separator.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <Separator label="Or" />
</template>
```
