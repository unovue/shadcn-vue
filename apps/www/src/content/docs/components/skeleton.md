---
title: Skeleton
description: Use to show a placeholder while content is loading. 
---

<ComponentPreview name="SkeletonDemo" /> 


## Installation

```bash
npx shadcn-vue@latest add skeleton
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
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Skeleton class="w-[100px] h-[20px] rounded-full" />
</template>
```