---
title: Slider
description: An input where the user selects a value from within a given range.
component: true
links:
  doc: https://reka-ui.com/docs/components/slider
  api: https://reka-ui.com/docs/components/slider#api-reference
---

::component-preview
---
name: SliderDemo
description: A slider component.
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add slider
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install reka-ui
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/slider) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider :default-value="[33]" :max="100" :step="1" />
</template>
```
