---
title: Skeleton
description: Use to show a placeholder while content is loading. 
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SkeletonDemo" /> 

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add skeleton
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project


<<< @/lib/registry/default/ui/skeleton/Skeleton.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Skeleton } from '{{codeConfig.aliases.components}}/ui/skeleton'
</script>

<template>
  <{{codeConfig.prefix}}Skeleton class="w-[100px] h-[20px] rounded-full" />
</template>
```
