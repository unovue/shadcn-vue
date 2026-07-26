---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle-group
  api: https://reka-ui.com/docs/components/toggle-group#api-reference
---

::component-preview
---
name: ToggleGroupDemo
description: A toggle group component.
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
npx shadcn-vue@latest add toggle-group
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/toggle-group) into your project.
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

## Examples

### Default

::component-preview
---
name: ToggleGroupDefaultDemo
---
::

### Outline

::component-preview
---
name: ToggleGroupDemo
---
::

### Single

::component-preview
---
name: ToggleGroupSingleDemo
---
::

### Small

::component-preview
---
name: ToggleGroupSmallDemo
---
::

### Large

::component-preview
---
name: ToggleGroupLargeDemo
---
::

### Disabled

::component-preview
---
name: ToggleGroupDisabledDemo
---
::
