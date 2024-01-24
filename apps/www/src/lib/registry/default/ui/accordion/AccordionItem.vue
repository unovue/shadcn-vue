<script setup lang="ts">
import { defineProps } from 'vue'
import { AccordionItem, type AccordionItemProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionItemProps & { class?: string }>()
const computeClasses = cn('border-b', props.class ?? '')
</script>

<template>
  <AccordionItem v-bind="props" :class="computeClasses">
    <slot />
  </AccordionItem>
</template>
