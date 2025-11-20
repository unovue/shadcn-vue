---
title: Kbd
description: Used to display textual user input from keyboard.
component: true
new: true
---

::component-preview
---
name: KbdDemo
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
npx shadcn-vue@latest add kbd
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/kbd) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue
<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'
</script>

<template>
  <Kbd>Ctrl</Kbd>
</template>
```

## Examples

### Group

Use the `KbdGroup` component to group keyboard keys together.

::component-preview
---
name: KbdGroupDemo
---
::

### Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

::component-preview
---
name: KbdWithButton
---
::

### Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

::component-preview
---
name: KbdWithTooltip
---
::

### Input Group

You can use the `Kbd` component inside a `InputGroupAddon` component to display a keyboard key inside an input group.

::component-preview
---
name: KbdWithInputGroup
---
::

## API Reference

### Kbd

Use the `Kbd` component to display a keyboard key.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` | ``      |

```vue
<Kbd>
Ctrl
</Kbd>
```

### KbdGroup

Use the `KbdGroup` component to group `Kbd` components together.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` | ``      |

```vue
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```
