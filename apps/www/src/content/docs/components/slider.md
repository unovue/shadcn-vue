---
title: Slider
description: An input where the user selects a value from within a given range.
source: apps/www/src/lib/registry/default/ui/slider 
primitive: https://www.radix-vue.com/components/slider.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SliderDemo" /> 

## Installation

```bash
npx shadcn-vue@latest add slider
```

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Slider } from '{{codeConfig.aliases.components}}/ui/slider'
</script>

<template>
  <{{codeConfig.prefix}}Slider :default-value="[33]" :max="100" :step="1" />
</template>
```
