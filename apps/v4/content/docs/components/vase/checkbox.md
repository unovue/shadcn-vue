---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  doc: https://vase-ui.com/components/checkbox
  api: https://vase-ui.com/components/checkbox#api-reference
---

::component-preview
---
name: CheckboxDemo
description: A checkbox
previewClass: h-88 sm:h-80
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
npx shadcn-vue@latest add checkbox
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/checkbox) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox />
</template>
```

## Checked State

Use `default-checked` for uncontrolled checkboxes, or `v-model` to control the state. Set `indeterminate` to show the mixed state.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const checked = ref(false)
</script>

<template>
  <Checkbox v-model="checked" />
</template>
```
