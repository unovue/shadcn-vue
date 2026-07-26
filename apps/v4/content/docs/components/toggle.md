---
title: Toggle
description: A two-state button that can be either on or off.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle
  api: https://reka-ui.com/docs/components/toggle#api-reference
---

::component-preview
---
name: ToggleDemo
description: A toggle component.
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
npx shadcn-vue@latest add toggle
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle) into your project.
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
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```

## Examples

### Default

::component-preview
---
name: ToggleDemo
---
::

### Outline

::component-preview
---
name: ToggleOutlineDemo
---
::

### With Text

::component-preview
---
name: ToggleTextDemo
---
::

### Small

::component-preview
---
name: ToggleSmallDemo
---
::

### Large

::component-preview
---
name: ToggleLargeDemo
---
::

### Disabled

::component-preview
---
name: ToggleDisabledDemo
---
::
