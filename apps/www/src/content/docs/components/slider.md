---
title: Slider
description: An input where the user selects a value from within a given range.
source: apps/www/src/lib/registry/default/ui/slider 
primitive: https://www.radix-vue.com/components/slider.html
---

<ComponentPreview name="SliderDemo" /> 

## Installation

```bash
npx shadcn-vue@latest add slider
```

## Usage

```vue
<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    :default-value="[33]" :max="100" :step="1"
  />
</template>
```


## Examples

### Form

<ComponentPreview name="SliderForm" />