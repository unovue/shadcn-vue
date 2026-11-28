---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
links:
  doc: https://vase-ui.com/components/accordion
  api: https://vase-ui.com/components/accordion#api-reference
---

::component-preview
---
name: AccordionDemo
class: '[&_.preview>div]:sm:max-w-[80%]'
description: An accordion with three items
align: start
previewClass: h-[27rem] sm:h-[25rem]
---
::

## Installation

:::::code-tabs

:::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

:::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add accordion
```

::

::::tabs-content{value="manual"}
  :::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install @vase-ui/vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/styles/vase-vega/ui/accordion) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  :::
::::

:::::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
</script>

<template>
  <Accordion>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

An `Accordion` opens one item at a time, and the user can close the open item. Set `multiple` to open more than one item at once. `v-model` and `default-value` take an array of item values.
