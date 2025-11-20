---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  doc: https://reka-ui.com/docs/components/switch
  api: https://reka-ui.com/docs/components/switch#api-reference
---

::component-preview
---
name: SwitchDemo
description: A switch component.
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
npx shadcn-vue@latest add switch
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/switch) into your project.
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
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <Switch />
</template>
```
