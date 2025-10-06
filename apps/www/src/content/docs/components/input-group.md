---
title: InputGroup
description: Display additional information or actions to an input or textarea.
---

<ComponentPreview name="InputGroupDemo" class="max-w-xs" />

## Installation

<TabPreview name="CLI">
<template #CLI>

```bash
npx shadcn-vue@latest add input-group
```
</template>

<template #Manual>

<Steps>

### Copy and paste the following code into your project:

`index.ts`

<<< @/registry/default/ui/input-group/index.ts

`InputGroup.vue`

<<< @/registry/default/ui/input-group/InputGroup.vue

`InputGroupAddon.vue`

<<< @/registry/default/ui/input-group/InputGroupAddon.vue

`InputGroupButton.vue`

<<< @/registry/default/ui/input-group/InputGroupButton.vue

`InputGroupInput.vue`

<<< @/registry/default/ui/input-group/InputGroupInput.vue

`InputGroupText.vue`

<<< @/registry/default/ui/input-group/InputGroupText.vue

`InputGroupTextarea.vue`

<<< @/registry/default/ui/input-group/InputGroupTextarea.vue

</Steps>

</template>
</TabPreview>

## Usage

```vue
<script setup lang="ts">
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Search</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

## Examples

### Icon

<ComponentPreview name="InputGroupWithIcon" class="max-w-xs" />

### Text

Display additional text information alongside inputs.

<ComponentPreview name="InputGroupWithText" class="max-w-xs" />

### Button

Add buttons to perform actions within the input group.

<ComponentPreview name="InputGroupWithButton" class="max-w-xs" />

### Tooltip

Add tooltips to provide additional context or help.

<ComponentPreview name="InputGroupWithTooltip" class="max-w-xs" />

### Textarea

Input groups also work with textarea components. Use `block-start` or `block-end` for alignment.

<ComponentPreview name="InputGroupWithTextarea" class="max-w-xs" />

### Spinner

Show loading indicators while processing input.

<ComponentPreview name="InputGroupWithSpinner" class="max-w-xs" />

### Label

Add labels within input groups to improve accessibility.

<ComponentPreview name="InputGroupWithLabel" class="max-w-xs" />

### Dropdown

Pair input groups with dropdown menus for complex interactions.

<ComponentPreview name="InputGroupWithDropdown" class="max-w-xs" />

### Button Group

Wrap input groups with button groups to create prefixes and suffixes.

<ComponentPreview name="InputGroupWithButtonGroup" class="max-w-xs" />

### Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic behavior and focus state handling.

<ComponentPreview name="InputGroupWithCustomInput" class="max-w-xs" />

```vue {9}
<script lang='ts' setup>
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/registry/default/ui/input-group'
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <InputGroup>
      <textarea
        data-slot="input-group-control"
        class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
        placeholder="Autoresize textarea..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton class="ml-auto" size="sm" variant="default">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
```

## API Reference

### InputGroup

The main component that wraps inputs and addons.

| Prop | Type | Default |
| ---- | ---- | ------- |
|`class`| `string`| |

```vue
<template>
  <InputGroup>
    <InputGroupInput />
    <InputGroupAddon />
  </InputGroup>
</template>
```

### InputGroupAddon

Displays icons, text, buttons, or other content alongside inputs.

::info
For proper focus navigation, the `InputGroupAddon` component should be placed after the input. Set the `align` prop to position the addon.
::

| Prop | Type | Default |
| ---- | ---- | ------- |
|`align`| `"inline-start" \| "inline-end" \| "block-start" \| "block-end"`| `'inline-start'` |
|`class`| `string`| |

```vue
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

For `<InputGroupInput />`, use the `inline-start` or `inline-end` alignment. For `<InputGroupTextarea />`, use the `block-start` or `block-end` alignment.

The `InputGroupAddon` component can have multiple `InputGroupButton` components and icons.

```vue
<template>
  <InputGroupAddon>
    <InputGroupButton>Button</InputGroupButton>
    <InputGroupButton>Button</InputGroupButton>
  </InputGroupAddon>
</template>
```

### InputGroupButton

Displays buttons within input groups.

| Prop | Type | Default |
| ---- | ---- | ------- |
|`size`| `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`| "xs" |
|`variant`| `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"`| "ghost" |
|`class`| `string`| |

```vue
<template>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton size="icon-xs" aria-label="Copy">
    <CopyIcon />
  </InputGroupButton>
</template>
```

### InputGroupInput

Replacement for `<Input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
| ---- | ---- | ------- |
|`class`| `string`| |

All other props are passed through to the underlying `<Input />` component.

```vue
<template>
  <InputGroup>
    <InputGroupInput placeholder="Enter text..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
  </InputGroup>
</template>
```

### InputGroupTextarea
Replacement for `<Textarea />` when building input groups. This component has the textarea group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
| ---- | ---- | ------- |
|`class`| `string`| |

All other props are passed through to the underlying `<Textarea />` component.

```vue
<template>
  <InputGroup>
    <InputGroupTextarea placeholder="Enter message..." />
    <InputGroupAddon align="block-end">
      <InputGroupButton>Send</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```
