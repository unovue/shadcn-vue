---
title: Separator
description: Visually or semantically separates content.
source: apps/www/src/lib/registry/default/ui/separator 
primitive: https://www.radix-vue.com/components/separator.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SeparatorDemo" /> 


## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add separator
```
</template>

<template #Manual>

<Steps>

### Install the following dependency

```bash
npm install radix-vue
```

### Copy and paste the following code into your project

<<< @/lib/registry/default/ui/separator/Separator.vue

 
</Steps>

</template>
</TabPreview>

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Separator } from '{{codeConfig.aliases.components}}/ui/separator'
</script>

<template>
  <{{codeConfig.prefix}}Separator />
</template>
```
