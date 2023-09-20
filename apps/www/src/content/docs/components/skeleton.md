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

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface SkeletonProps {
  class?: string
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-secondary', props.class)" />
</template>
```

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