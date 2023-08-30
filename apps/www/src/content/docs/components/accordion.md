---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content. 
source: https://github.com/radix-vue/shadcn-vue/tree/main/apps/www/src/lib/registry/default/ui/accordion 
primitive: https://www.radix-vue.com/components/accordion.html
---


<ComponentPreview name="AccordionDemo" class="[&_.accordion]:sm:max-w-[70%]">

<<< ../../../lib/registry/default/examples/AccordionDemo.vue

</ComponentPreview>



## Installation

```bash
npx shadcn-vue@latest add accordion
```

<ManualInstall>

1. Install `radix-vue`:

```bash
npm install radix-vue
```

2. Copy and paste the component source files linked at the top of this page into your project.
</ManualInstall>

## Usage

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'
</script>

<AccordionRoot>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</AccordionRoot>
```