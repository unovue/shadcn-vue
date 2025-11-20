---
title: Spinner
description: An indicator that can be used to show a loading state.
component: true
new: true
---

::component-preview
---
name: SpinnerDemo
class: '[&_.preview]:p-6'
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
npx shadcn-vue@latest add spinner
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/spinner) into your project.
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
import { Spinner } from '@/components/ui/Spinner'
</script>

<template>
  <Spinner />
</template>
```

## Customization

You can replace the default spinner icon with any other icon by editing the `Spinner` component.

::component-preview
---
name: SpinnerCustomDemo
---
::

## Examples

### Size

Use the `size-*` utility class to change the size of the spinner.

::component-preview
---
name: SpinnerSizeDemo
---
::

### Color

Use the `text-*` utility class to change the color of the spinner.

::component-preview
---
name: SpinnerColorDemo
---
::

### Button

Add a spinner to a button to indicate a loading state. The `<Button />` will handle the spacing between the spinner and the text.

::component-preview
---
name: SpinnerButtonDemo
---
::

### Badge

You can also use a spinner inside a badge.

::component-preview
---
name: SpinnerBadgeDemo
---
::

### Input Group

Input Group can have spinners inside `<InputGroupAddon>`.

::component-preview
---
name: SpinnerInputGroupDemo
---
::

### Empty

You can place a spinner inside an empty state.

::component-preview
---
name: SpinnerEmptyDemo
---
::

### Item

Use the spinner inside `<ItemMedia>` to indicate a loading state.

::component-preview
---
name: SpinnerItemDemo
---
::

## API Reference

### Spinner

Use the `Spinner` component to display a spinner.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class`     | `string` |         |

```vue
<template>
  <Spinner />
</template>
```
