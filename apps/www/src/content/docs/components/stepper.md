---
title: Stepper
description: A set of steps that are used to indicate progress through a multi-step process.
source: apps/www/src/lib/registry/default/ui/stepper
primitive: https://www.radix-vue.com/components/stepper.html
---

<ComponentPreview name="StepperDemo" />

## Installation

```bash
npx shadcn-vue@latest add stepper
```

## Usage

```vue
<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
</script>

<template>
  <Stepper>
    <StepperItem :step="1" linear>
      <StepperTrigger>
        <StepperIndicator>1</StepperIndicator>
        <StepperTitle>Step 1</StepperTitle>
        <StepperDescription>This is the first step</StepperDescription>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>
    <StepperItem :step="2">
      <StepperTrigger>
        <StepperIndicator>2</StepperIndicator>
        <StepperTitle>Step 2</StepperTitle>
        <StepperDescription>This is the second step</StepperDescription>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>
```
