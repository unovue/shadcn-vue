---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
component: true
links:
  doc: https://reka-ui.com/docs/components/number-field
  api: https://reka-ui.com/docs/components/number-field#api-reference
---

::component-preview
---
name: NumberFieldDemo
description: An default Number Field
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
npx shadcn-vue@latest add number-field
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/number-field) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

### Disabled
::component-preview
---
name: NumberFieldDisabledDemo
description: Disabled Number Field
---
::

### Decimal
::component-preview
---
name: NumberFieldDecimalDemo
description: Number Field with decimal support
---
::

### Percentage
::component-preview
---
name: NumberFieldPercentageDemo
description: Percentage Number Field
---
::

### Currency
::component-preview
---
name: NumberFieldCurrencyDemo
description: Currency Number Field
---
::

### Form
::component-preview
---
name: NumberFieldFormDemo
description: Number Field inside a form
---
::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
</script>

<template>
  <NumberField :default-value="18" :min="0">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>

```
