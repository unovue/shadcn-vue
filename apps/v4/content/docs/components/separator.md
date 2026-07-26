---
title: Separator
description: Visually or semantically separates content.
component: true
links:
  doc: https://reka-ui.com/docs/components/separator
  api: https://reka-ui.com/docs/components/separator#api-reference
---

::component-preview
---
name: SeparatorDemo
description: A separator component.
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
npx shadcn-vue@latest add separator
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/separator) into your project.
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
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">
        Radix Primitives
      </h4>
      <p class="text-sm text-muted-foreground">
        An open-source UI component library.
      </p>
    </div>
    <Separator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
```
