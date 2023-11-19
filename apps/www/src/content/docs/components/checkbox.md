---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
source: apps/www/src/lib/registry/default/ui/checkbox 
primitive: https://www.radix-vue.com/components/checkbox.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="CheckboxDemo"  /> 


## Installation
 

```bash
npx shadcn-vue@latest add checkbox
``` 

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Checkbox } from '{{codeConfig.aliases.components}}/ui/checkbox'
</script>

<template>
  <{{codeConfig.prefix}}Checkbox id="terms" />
</template>
```

## Examples

### With text

<ComponentPreview name="CheckboxWithText" />

### Disabled

<ComponentPreview name="CheckboxDisabled"  />

### Form

<ComponentPreview name="CheckboxFormSingle" />

<ComponentPreview name="CheckboxFormMultiple" />
