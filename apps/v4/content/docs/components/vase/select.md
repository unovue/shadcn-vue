---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
component: true
links:
  doc: https://vase-ui.com/components/select
  api: https://vase-ui.com/components/select#api-reference
---

::component-preview
---
name: SelectDemo
description: A select component.
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
npx shadcn-vue@latest add select
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/select) into your project.
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fruits = {
  apple: 'Apple',
  banana: 'Banana',
  blueberry: 'Blueberry',
  grapes: 'Grapes',
  pineapple: 'Pineapple',
}
</script>

<template>
  <Select :items="fruits">
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">
        Apple
      </SelectItem>
      <SelectItem value="banana">
        Banana
      </SelectItem>
      <SelectItem value="blueberry">
        Blueberry
      </SelectItem>
      <SelectItem value="grapes">
        Grapes
      </SelectItem>
      <SelectItem value="pineapple">
        Pineapple
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

`items` maps the value of each item to its label. `SelectValue` shows the label of the selected value, and it shows the raw value when the root has no `items`.

## Examples

### Scrollable

::component-preview
---
name: SelectScrollable
description: A scrollable select component with timezone options.
---
::

### Multiple

::component-preview
---
name: SelectMultipleDemo
description: A multiple select component
---
::
