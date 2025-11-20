---
title: Native Select
description: A styled native HTML select element with consistent design system integration.
component: true
new: true
---

::callout
---
icon: true
---
For a styled select component, see the [Select](/docs/components/select) component.
::

::component-preview
---
name: NativeSelectDemo
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
npx shadcn-vue@latest add native-select
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/native-select) into your project.
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
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select'
</script>

<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a fruit
    </NativeSelectOption>
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
    <NativeSelectOption value="blueberry">
      Blueberry
    </NativeSelectOption>
    <NativeSelectOption value="grapes" disabled>
      Grapes
    </NativeSelectOption>
    <NativeSelectOption value="pineapple">
      Pineapple
    </NativeSelectOption>
  </NativeSelect>
</template>
```

## Examples

### With Groups

Organize options using `NativeSelectOptGroup` for better categorization.

::component-preview
---
name: NativeSelectGroupsDemo
---
::

```vue showLineNumbers
<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a food
    </NativeSelectOption>
    <NativeSelectOptGroup label="Fruits">
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
    </NativeSelectOptGroup>
    <NativeSelectOptGroup label="Vegetables">
      <NativeSelectOption value="carrot">
        Carrot
      </NativeSelectOption>
      <NativeSelectOption value="broccoli">
        Broccoli
      </NativeSelectOption>
      <NativeSelectOption value="spinach">
        Spinach
      </NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
```

### Disabled State

Disable individual options or the entire select component.

::component-preview
---
name: NativeSelectDisabledDemo
---
::

### Invalid State

Show validation errors with the `aria-invalid` attribute and error styling.

::component-preview
---
name: NativeSelectInvalidDemo
---
::

```vue showLineNumbers
<template>
  <NativeSelect aria-invalid="true">
    <NativeSelectOption value="">
      Select a country
    </NativeSelectOption>
    <NativeSelectOption value="us">
      United States
    </NativeSelectOption>
    <NativeSelectOption value="uk">
      United Kingdom
    </NativeSelectOption>
    <NativeSelectOption value="ca">
      Canada
    </NativeSelectOption>
  </NativeSelect>
</template>
```

### Form Integration

Use with form libraries like VeeValidate for controlled components.

::component-preview
---
name: NativeSelectFormDemo
---
::

<!-- ### Input Group Integration

Combine with `InputGroup` for complex input layouts.

::component-preview
---
name: NativeSelectInputGroupDemo
---
:: -->

## Native Select vs Select

- Use `NativeSelect` when you need native browser behavior, better performance, or mobile-optimized dropdowns.
- Use `Select` when you need custom styling, animations, or complex interactions.

The `NativeSelect` component provides native HTML select functionality with consistent styling that matches your design system.

## Accessibility

- The component maintains all native HTML select accessibility features.
- Screen readers can navigate through options using arrow keys.
- The chevron icon is marked as `aria-hidden="true"` to avoid duplication.
- Use `aria-label` or `aria-labelledby` for additional context when needed.

```vue showLineNumbers
<template>
  <NativeSelect aria-label="Choose your preferred language">
    <NativeSelectOption value="en">
      English
    </NativeSelectOption>
    <NativeSelectOption value="es">
      Spanish
    </NativeSelectOption>
    <NativeSelectOption value="fr">
      French
    </NativeSelectOption>
  </NativeSelect>
</template>
```

## API Reference

### NativeSelect

The main select component that wraps the native HTML select element.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `class` | `string` |         |

All other props are passed through to the underlying `<select>` element.

```vue
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### NativeSelectOption

Represents an individual option within the select.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `value`     | `string`  |         |
| `disabled`  | `boolean` | `false` |
| `class` | `string`  |         |

All other props are passed through to the underlying `<option>` element.

```vue
<template>
  <NativeSelectOption value="apple">
    Apple
  </NativeSelectOption>
  <NativeSelectOption value="banana" disabled>
    Banana
  </NativeSelectOption>
</template>
```

### NativeSelectOptGroup

Groups related options together for better organization.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `label`     | `string`  |         |
| `disabled`  | `boolean` | `false` |
| `class` | `string`  |         |

All other props are passed through to the underlying `<optgroup>` element.

```vue
<template>
  <NativeSelectOptGroup label="Fruits">
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
  </NativeSelectOptGroup>
</template>
```
