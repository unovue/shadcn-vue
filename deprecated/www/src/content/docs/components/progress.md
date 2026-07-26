---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: apps/www/src/registry/default/ui/progress
primitive: https://www.reka-ui.com/docs/components/progress.html
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
npm install reka-ui
```

### Copy and paste the following code into your project:

 <<< @/registry/default/ui/progress/Progress.vue

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
