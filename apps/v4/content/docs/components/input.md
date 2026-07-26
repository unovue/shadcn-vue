---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
---

::component-preview
---
name: InputDemo
class: '[&_input]:max-w-xs'
description: A form input component.
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
npx shadcn-vue@latest add input
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/input) into your project.
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
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input />
</template>
```

## Examples

### Default

::component-preview
---
name: InputDemo
class: '[&_input]:max-w-xs'
description: A default input component.
---
::

### File

::component-preview
---
name: InputFile
description: An input with a file upload field.
---
::

### Disabled

::component-preview
---
name: InputDisabled
class: '[&_input]:max-w-xs'
description: A disabled input component.
---
::

### With Label

::component-preview
---
name: InputWithLabel
description: An input with a label.
---
::

### With Button

::component-preview
---
name: InputWithButton
description: An input with a button.
---
::
