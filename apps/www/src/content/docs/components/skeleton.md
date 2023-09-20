---
title: Skeleton
description: Use to show a placeholder while content is loading. 
---

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

```vue
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Skeleton class="w-[100px] h-[20px] rounded-full" />
</template>
```