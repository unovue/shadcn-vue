---
title: Button
description: Displays a button or a component that looks like a button.
featured: true
component: true
---

::component-preview
---
name: ButtonDemo
description: A button
align: center
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
npx shadcn-vue@latest add button
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
    Copy and paste the GitHub source code into your project.
    ::
    
    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
import { Button } from "@/components/ui/button"
```

```vue showLineNumbers
<Button variant="outline">Button</Button>
```

## Link

You can use the `as-child` prop to make another component look like a button. Here's an example of a link that looks like a button.

```vue showLineNumbers
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button as-child>
    <a href="/login">Login</a>
  </Button>
</template>
```
