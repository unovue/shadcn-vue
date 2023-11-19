---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
source: apps/www/src/lib/registry/default/ui/select 
primitive: https://www.radix-vue.com/components/select.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="SelectDemo" /> 

## Installation


```bash
npx shadcn-vue@latest add select
```

## Usage

```vue-vue
<script setup lang="ts">
import {
  {{codeConfig.prefix}}Select,
  {{codeConfig.prefix}}SelectContent,
  {{codeConfig.prefix}}SelectGroup,
  {{codeConfig.prefix}}SelectItem,
  {{codeConfig.prefix}}SelectLabel,
  {{codeConfig.prefix}}SelectTrigger,
  {{codeConfig.prefix}}SelectValue,
} from '{{codeConfig.aliases.components}}/ui/select'
</script>

<template>
  <{{codeConfig.prefix}}Select>
    <{{codeConfig.prefix}}SelectTrigger>
      <{{codeConfig.prefix}}SelectValue placeholder="Select a fruit" />
    </{{codeConfig.prefix}}SelectTrigger>
    <{{codeConfig.prefix}}SelectContent>
      <{{codeConfig.prefix}}SelectGroup>
        <{{codeConfig.prefix}}SelectLabel>Fruits</{{codeConfig.prefix}}SelectLabel>
        <{{codeConfig.prefix}}SelectItem value="apple">
          Apple
        </{{codeConfig.prefix}}SelectItem>
      </{{codeConfig.prefix}}SelectGroup>
    </{{codeConfig.prefix}}SelectContent>
  </{{codeConfig.prefix}}Select>
</template>
```

## Examples

### Form

<ComponentPreview name="SelectForm" />
