---
title: Button Group
description: A container that groups related buttons together with consistent styling.
---

<ComponentPreview name="ButtonGroupDemo" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add button-group
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project

`index.ts`

<<< @/registry/default/ui/button-group/index.ts

`ButtonGroup.vue`

<<< @/registry/default/ui/button-group/ButtonGroup.vue

`ButtonGroupText.vue`

<<< @/registry/default/ui/button-group/ButtonGroupText.vue

`ButtonGroupSeparator.vue`

<<< @/registry/default/ui/button-group/ButtonGroupSeparator.vue

</Steps>
</template>
</TabPreview>

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

<ComponentPreview name="ButtonGroupOrientationDemo" />

### Size

Control the size of buttons using the `size` prop on individual buttons.

<ComponentPreview name="ButtonGroupSizeDemo" />

### Nested

`<ButtonGroup>` components to create button groups with spacing.

<ComponentPreview name="ButtonGroupNestedDemo" />

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

<ComponentPreview name="ButtonGroupSeparatorDemo" />

### Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

<ComponentPreview name="ButtonGroupSplitDemo" />

### Input

Wrap an `Input` component with buttons.

<ComponentPreview name="ButtonGroupWithInputDemo" />

### Dropdown Menu

Create a split button group with a `DropdownMenu` component.

<ComponentPreview name="ButtonGroupWithDropdownMenuDemo" />

### Select

Pair with a `Select` component.

<ComponentPreview name="ButtonGroupWithSelectDemo" />

### Popover

Use with a `Popover` component.

<ComponentPreview name="ButtonGroupWithPopoverDemo" />

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
      <Label html-for="name">Text</Label>
    </ButtonGroupText>
    <Input id="name" placeholder="Type something here..." />
  </ButtonGroup>
</template>
```
