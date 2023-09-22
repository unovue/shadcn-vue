---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/checkbox 
primitive: https://www.radix-vue.com/components/checkbox.html
---


<ComponentPreview name="CheckboxDemo"  /> 


## Installation
 

```bash
npx shadcn-vue@latest add checkbox
``` 

## Usage

```vue
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox id="terms" />
</template>
```

## Examples

### Disabled

<ComponentPreview name="CheckboxDisabled"  /> 