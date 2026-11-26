---
title: Button
description: Displays a button or a component that looks like a button.
featured: true
component: true
links:
  doc: https://vase-ui.com/components/button
  api: https://vase-ui.com/components/button#api-reference
---

::component-preview
---
name: ButtonDemo
description: A button
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
npx shadcn-vue@latest add button
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/button) into your project.
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
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline">
    Button
  </Button>
</template>
```

## Cursor

Tailwind v4 [switched](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) from `cursor: pointer` to `cursor: default` for the button component.

If you want to keep the `cursor: pointer` behavior, add the following code to your CSS file:

You can also enable this during project setup with `npx shadcn-vue@latest init --pointer`.

```css showLineNumbers title="tailwind.css"
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Examples

### Size

::component-preview
---
name: ButtonSize
class: mb-4
---
::

### Default

::component-preview
---
name: ButtonDefault
class: mb-4
---
::

### Outline

::component-preview
---
name: ButtonOutline
class: mb-4
---
::

### Secondary

::component-preview
---
name: ButtonSecondary
class: mb-4
---
::

### Ghost

::component-preview
---
name: ButtonGhost
class: mb-4
---
::

### Destructive

::component-preview
---
name: ButtonDestructive
class: mb-4
---
::

### Link

::component-preview
---
name: ButtonLink
class: mb-4
---
::

### Icon

::component-preview
---
name: ButtonIcon
class: mb-4
---
::

```vue showLineNumbers
<template>
  <Button variant="outline" size="icon" aria-label="Submit">
    <CircleFadingArrowUpIcon />
  </Button>
</template>
```

### With Icon

The spacing between the icon and the text is automatically adjusted based on the size of the button. You do not need any margin on the icon.

::component-preview
---
name: ButtonWithIcon
class: mb-4
---
::

### Rounded

Use the `rounded-full` class to make the button rounded.

::component-preview
---
name: ButtonRounded
class: mb-4
---
::

### Spinner

::component-preview
---
name: ButtonLoading
class: mb-4
---
::

### Button Group

::component-preview
---
name: ButtonGroupDemo
class: mb-4
---
::

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/vase/button-group) documentation for more details.

### Link

`Button` has the role, the keys and the disabled state of a button. To make a link look like a button, give the `<a>` the classes of `buttonVariants`.

```vue showLineNumbers
<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
</script>

<template>
  <a href="/login" :class="buttonVariants()">Login</a>
</template>
```

## API Reference

### Button

The `Button` component is a wrapper around the `button` element that adds a variety of styles and functionality.

| Prop      | Type                                                                                          | Default     |
| --------- | --------------------------------------------------------------------------------------------- | ----------- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"`                 | `"default"` |
| `size`    | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"`          | `"default"` |
| `type`    | `"button" \| "submit" \| "reset"`                                                             | `"button"`  |
