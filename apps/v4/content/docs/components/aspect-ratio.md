---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
links:
  doc: https://reka-ui.com/docs/components/aspect-ratio
  api: https://reka-ui.com/docs/components/aspect-ratio#api-reference
---

::component-preview
---
name: AspectRatioDemo
description: A component that displays an image with a 16:9 aspect ratio.
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
npx shadcn-vue@latest add aspect-ratio
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/aspect-ratio) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img src="..." alt="Image" class="rounded-md object-cover">
  </AspectRatio>
</template>
```
