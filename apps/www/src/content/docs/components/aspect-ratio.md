---
title: Aspect Ratio
description: Displays content within a desired ratio.
source: apps/www/src/lib/registry/default/ui/aspect-ratio
primitive: https://www.radix-vue.com/components/aspect-ratio.html
---

<ComponentPreview name="AspectRatioDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add aspect-ratio
```
</template>

<template #Manual>

<Steps>

### Install the following dependency:

```bash
npm install radix-vue
```

### Copy and paste the following code into your project:

<<< @/lib/registry/default/ui/aspect-ratio/AspectRatio.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <div class="w-[450px]">
    <AspectRatio :ratio="16 / 9">
      <img src="..." alt="Image" class="rounded-md object-cover">
    </AspectRatio>
  </div>
</template>
```
