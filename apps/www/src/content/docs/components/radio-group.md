---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
source: apps/www/src/lib/registry/default/ui/radio-group 
primitive: https://www.radix-vue.com/components/radio-group.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="RadioGroupDemo" /> 

## Installation


```bash
npx shadcn-vue@latest add radio-group
```

## Usage

```vue-vue
<script setup lang="ts">
import { {{codeConfig.prefix}}Label } from '{{codeConfig.aliases.components}}/ui/label'
import { {{codeConfig.prefix}}RadioGroup, RadioGroupItem } from '{{codeConfig.aliases.components}}/ui/radio-group'
</script>

<template>
  <{{codeConfig.prefix}}RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <{{codeConfig.prefix}}RadioGroupItem id="option-one" value="option-one" />
      <{{codeConfig.prefix}}Label for="option-one">Option One</{{codeConfig.prefix}}Label>
    </div>
    <div class="flex items-center space-x-2">
      <{{codeConfig.prefix}}RadioGroupItem id="option-two" value="option-two" />
      <{{codeConfig.prefix}}Label for="option-two">Option Two</{{codeConfig.prefix}}Label>
    </div>
  </{{codeConfig.prefix}}RadioGroup>
</template>
```

## Examples

### Form

<ComponentPreview name="RadioGroupForm" />
