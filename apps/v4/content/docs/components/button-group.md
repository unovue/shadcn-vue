---
title: Button Group
description: A container that groups related buttons together with consistent styling.
component: true
new: true
---

::component-preview
---
name: ButtonGroupDemo
class: '[&_.preview]:min-h-[400px]'
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
npx shadcn-vue@latest add button-group
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/button-group) into your project.
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
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

## Accessibility

- The `ButtonGroup` component has the `role` attribute set to `group`.
- Use `Tab` to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```vue
<template>
  <ButtonGroup aria-label="Button group">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

## ButtonGroup vs ToggleGroup

- Use the `ButtonGroup` component when you want to group buttons that perform an action.
- Use the `ToggleGroup` component when you want to group buttons that toggle a state.

## Examples

### Orientation

Set the `orientation` prop to change the button group layout.

::component-preview
---
name: ButtonGroupOrientationDemo
---
::

### Size

Control the size of buttons using the `size` prop on individual buttons.

::component-preview
---
name: ButtonGroupSizeDemo
---
::

### Nested

`<ButtonGroup>` components to create button groups with spacing.

::component-preview
---
name: ButtonGroupNestedDemo
---
::

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

::component-preview
---
name: ButtonGroupSeparatorDemo
---
::

### Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

::component-preview
---
name: ButtonGroupSplitDemo
---
::

### Input

Wrap an `Input` component with buttons.

::component-preview
---
name: ButtonGroupWithInputDemo
---
::

### Input Group

Wrap an `InputGroup` component to create complex input layouts.

::component-preview
---
name: ButtonGroupInputGroupDemo
---
::

### Dropdown Menu

Create a split button group with a `DropdownMenu` component.

::component-preview
---
name: ButtonGroupWithDropdownMenuDemo
---
::

### Select

Pair with a `Select` component.

::component-preview
---
name: ButtonGroupWithSelectDemo
---
::

### Popover

Use with a `Popover` component.

::component-preview
---
name: ButtonGroupWithPopoverDemo
---
::

## API Reference

### ButtonGroup

The `ButtonGroup` component is a container that groups related buttons together with consistent styling.

| Prop         | Type                             | Default   |
| ------------ | -------------------------------- | --------- |
| `orientation` | `"horizontal"` \| `"vertical"`    | `"horizontal"` |

```vue
<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

Nest multiple button groups to create complex layouts with spacing. See the [nested](#nested) example for more details.

```vue
<template>
  <ButtonGroup>
    <ButtonGroup />
    <ButtonGroup />
  </ButtonGroup>
</template>
```

### ButtonGroupSeparator

The `ButtonGroupSeparator` component visually divides buttons within a group.

| Prop      | Type   | Default |
| --------- | ------ | ------- |
| `orientation`    | `"horizontal" \| "vertical"` | `vertical`    |

```vue
<template>
  <ButtonGroup>
    <Button>Button 1</Button>
    <ButtonGroupSeparator />
    <Button>Button 2</Button>
  </ButtonGroup>
</template>
```

### ButtonGroupText

Use this component to display text within a button group.

| Prop      | Type   | Default |
| --------- | ------ | ------- |
| `as-child`    | boolean | `false`    |

```vue
<template>
  <ButtonGroup>
    <ButtonGroupText>Text</ButtonGroupText>
    <Button>Button</Button>
  </ButtonGroup>
</template>
```

Use the `as-child` prop to render a custom component as the text, for example a label.

```vue
<script setup lang="ts">
import { ButtonGroupText } from '@/components/ui/button-group'
import { Label } from '@/components/ui/label'
</script>

<template>
  <ButtonGroup>
    <ButtonGroupText as-child>
      <Label for="name">Text</Label>
    </ButtonGroupText>
    <Input id="name" placeholder="Type something here..." />
  </ButtonGroup>
</template>
```
