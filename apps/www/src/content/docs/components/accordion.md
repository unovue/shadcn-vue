---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content. 
source: apps/www/src/lib/registry/default/ui/accordion 
primitive: https://www.radix-vue.com/components/accordion.html
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>


<ComponentPreview name="AccordionDemo" class="sm:max-w-[70%]" />

## Installation
 

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add accordion
```

### Update `tailwind.config.js`

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
}
```
  
</Steps>
 

## Usage

```vue-vue
<script setup lang="ts">
import { 
  {{codeConfig.prefix}}Accordion,
  {{codeConfig.prefix}}AccordionContent,
  {{codeConfig.prefix}}AccordionItem,
  {{codeConfig.prefix}}AccordionTrigger 
} from '{{codeConfig.aliases.components}}/ui/accordion'
</script>

<template>
  <{{codeConfig.prefix}}Accordion type="single" collapsible>
    <{{codeConfig.prefix}}AccordionItem value="item-1">
      <{{codeConfig.prefix}}AccordionTrigger>Is it accessible?</{{codeConfig.prefix}}AccordionTrigger>
      <{{codeConfig.prefix}}AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </{{codeConfig.prefix}}AccordionContent>
    </{{codeConfig.prefix}}AccordionItem>
  </{{codeConfig.prefix}}Accordion>
</template>
```

