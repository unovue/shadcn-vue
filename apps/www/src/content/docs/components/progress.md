---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
source: apps/www/src/lib/registry/default/ui/progress 
primitive: https://www.radix-vue.com/components/progress.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


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

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Progress } from '{{codeConfig.aliases.components}}/ui/progress'
</script>

<template>
  <{{codeConfig.prefix}}Progress :model-value="33" />
</template>
```
