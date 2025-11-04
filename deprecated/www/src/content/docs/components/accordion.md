---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
source: apps/www/src/registry/default/ui/accordion
primitive: https://www.reka-ui.com/docs/components/accordion.html
---

<ComponentPreview name="AccordionDemo" class="sm:max-w-[70%]" />

## Installation

```bash
npx shadcn-vue@latest add accordion
```

## Usage

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```
