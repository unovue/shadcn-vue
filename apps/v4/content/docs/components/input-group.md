---
title: Input Group
description: Display additional information or actions to an input or textarea.
component: true
new: true
---

::component-preview
---
name: InputGroupDemo
class: '[&_.preview]:p-4'
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
npx shadcn-vue@latest add input-group
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input-group) into your project.
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

::component-preview
---
name: InputGroupWithIcon
class: '[&_.preview]:p-4'
---
::

### Text

Display additional text information alongside inputs.

::component-preview
---
name: InputGroupWithText
class: '[&_.preview]:p-4'
---
::

### Button

Add buttons to perform actions within the input group.

::component-preview
---
name: InputGroupWithButton
class: '[&_.preview]:p-4'
---
::

### Tooltip

Add tooltips to provide additional context or help.

::component-preview
---
name: InputGroupWithTooltip
class: '[&_.preview]:p-4'
---
::

### Textarea

Input groups also work with textarea components. Use `block-start` or `block-end` for alignment.

::component-preview
---
name: InputGroupWithTextarea
class: '[&_.preview]:p-4'
---
::

### Spinner

Show loading indicators while processing input.

::component-preview
---
name: InputGroupWithSpinner
class: '[&_.preview]:p-4'
---
::

### Label

Add labels within input groups to improve accessibility.

::component-preview
---
name: InputGroupWithLabel
class: '[&_.preview]:p-4'
---
::

### Dropdown

Pair input groups with dropdown menus for complex interactions.

::component-preview
---
name: InputGroupWithDropdown
class: '[&_.preview]:p-4'
---
::

### Button Group

Wrap input groups with button groups to create prefixes and suffixes.

::component-preview
---
name: InputGroupWithButtonGroup
class: '[&_.preview]:p-4'
---
::

### Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic behavior and focus state handling.

No style is applied to the custom input. Apply your own styles using the `class` prop.

::component-preview
---
name: InputGroupWithCustomInput
class: '!mb-4 [&_.preview]:p-4'
---
::

```vue showLineNumbers
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group'
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

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

```vue
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### InputGroupAddon

Displays icons, text, buttons, or other content alongside inputs.

::callout{title="Focus Navigation"}
For proper focus navigation, the `InputGroupAddon` component should be placed
after the input. Set the `align` prop to position the addon.
::

| Prop        | Type                                                             | Default          |
| ----------- | ---------------------------------------------------------------- | ---------------- |
| `align`     | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `class` | `string`                                                         |                  |

```vue
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

**For `<InputGroupInput />`, use the `inline-start` or `inline-end` alignment. For `<InputGroupTextarea />`, use the `block-start` or `block-end` alignment.**

The `InputGroupAddon` component can have multiple `InputGroupButton` components and icons.

```vue
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### InputGroupButton

Displays buttons within input groups.

| Prop        | Type                                                                          | Default   |
| ----------- | ----------------------------------------------------------------------------- | --------- |
| `size`      | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`                                      | `"xs"`    |
| `variant`   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `class` | `string`                                                                      |           |

```vue
<InputGroupButton>
Button
</InputGroupButton>

<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### InputGroupInput

Replacement for `<Input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<Input />` component.

```vue
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### InputGroupTextarea

Replacement for `<Textarea />` when building input groups. This component has the textarea group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<Textarea />` component.

```vue
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```
