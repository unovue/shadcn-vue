---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
source: apps/www/src/lib/registry/default/ui/radio-group
primitive: https://www.radix-vue.com/components/radio-group.html
---

<ComponentPreview name="RadioGroupDemo" />

## Installation

```bash
npx shadcn-vue@latest add radio-group
```

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="option-one">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-one" value="option-one" />
      <Label for="option-one">Option One</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="option-two" value="option-two" />
      <Label for="option-two">Option Two</Label>
    </div>
  </RadioGroup>
</template>
```

## Examples

### Form

Please first read `vee-validate` section for [Checkbox and Radio Inputs](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/)

<ComponentPreview name="RadioGroupForm" />
