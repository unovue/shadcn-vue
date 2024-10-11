---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
source: apps/www/src/lib/registry/default/ui/number-field
primitive: https://www.radix-vue.com/components/number-field.html
---

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add number-field
```
</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
</script>

<template>
  <NumberField>
    <Label>Age</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
```

## Examples

### Default

<ComponentPreview name="NumberFieldDemo" class="max-w-[180px]" />

### Disabled

<ComponentPreview name="NumberFieldDisabled" class="max-w-[180px]" />

### Decimal

<ComponentPreview name="NumberFieldDecimal" class="max-w-[180px]" />

### Percentage

<ComponentPreview name="NumberFieldPercentage" class="max-w-[180px]" />

### Currency

<ComponentPreview name="NumberFieldCurrency" class="max-w-[220px]" />

### Form

<ComponentPreview name="NumberFieldForm" class="max-w-xs" />
