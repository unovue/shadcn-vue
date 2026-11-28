---
title: Stepper
description: A set of steps that are used to indicate progress through a multi-step process.
component: true
---

::component-preview
---
name: StepperDemo
description: A stepper component.
---
::

## Installation

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add stepper
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/stepper) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

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
    <StepperItem :step="1">
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

## Examples

### Horizontal

::component-preview
---
name: StepperHorizental
description: A horizental stepper component.
---
::

### Vertical

::component-preview
---
name: StepperVertical
description: A vertical stepper component.
previewClass: h-96
---
::

### Form

::component-preview
---
name: StepperForm
description: A form stepper component.
previewClass: h-[28rem]
---
::
