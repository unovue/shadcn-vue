---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/progress 
primitive: https://www.radix-vue.com/components/progress.html
---

<ComponentPreview name="ProgressDemo" /> 



## Installation

```bash
npx shadcn-vue@latest add progress
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
import { Progress } from '@/lib/registry/default/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```