---
title: Aspect Ratio
description: Displays content within a desired ratio.
source: apps/www/src/lib/registry/default/ui/aspect-ratio 
primitive: https://www.radix-vue.com/components/aspect-ratio.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


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

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}AspectRatio } from '{{codeConfig.aliases.components}}/ui/aspect-ratio'
</script>

<template>
  <div class="w-[450px]">
    <{{codeConfig.prefix}}AspectRatio :ratio="16 / 9">
      <img src="..." alt="Image" class="rounded-md object-cover">
    </{{codeConfig.prefix}}AspectRatio>
  </div>
</template>
```
