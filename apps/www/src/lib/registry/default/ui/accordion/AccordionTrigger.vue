<script setup lang="ts">
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: string }>()
</script>

<template>
  <AccordionHeader class="flex" as="div">
    <AccordionTrigger
      v-bind="props"
      :class="
        cn(
          'flex flex-1 group items-center justify-between py-4 font-medium transition-all hover:underline',
          props.class,
        )
      "
    >
      <slot />
      <ChevronDown
        class="w-4 h-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
