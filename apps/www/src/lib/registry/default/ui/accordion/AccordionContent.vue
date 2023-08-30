<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: string }>()
</script>

<template>
  <AccordionContent
    v-bind="props"
    :class="
      cn(
        'overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        props.class,
      )
    "
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
