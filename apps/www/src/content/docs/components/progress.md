---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: apps/www/src/lib/registry/default/ui/progress
primitive: https://www.radix-vue.com/components/progress.html
---

<ComponentPreview name="ProgressDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add progress
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

 <<< @/lib/registry/default/ui/progress/Progress.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```
