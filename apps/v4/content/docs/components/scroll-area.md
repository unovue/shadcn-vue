---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
component: true
links:
  doc: https://reka-ui.com/docs/components/scroll-area
  api: https://reka-ui.com/docs/components/scroll-area#api-reference
---

::component-preview
---
name: ScrollAreaDemo
description: A scroll area component.
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
npx shadcn-vue@latest add scroll-area
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
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/scroll-area) into your project.
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
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then one day, the king tripped over one of Jokester's whoopee cushions and
    fell into the moat. He was so embarrassed that he decided to make Jokester the
    official court jester.
  </ScrollArea>
</template>
```
