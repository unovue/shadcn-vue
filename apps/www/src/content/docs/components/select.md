---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
source: apps/www/src/lib/registry/default/ui/select 
primitive: https://www.radix-vue.com/components/select.html
---


<ComponentPreview name="SelectDemo" /> 

## Installation


```bash
npx shadcn-vue@latest add select
```

## Usage

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

## Examples

### Form

<ComponentPreview name="SelectForm" />
