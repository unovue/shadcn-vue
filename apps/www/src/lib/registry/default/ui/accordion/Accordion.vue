<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootProps,
} from 'radix-vue'

const props = defineProps<AccordionRootProps>()
</script>

<template>
  <AccordionRoot v-bind="props" class="accordion">
    <slot />
  </AccordionRoot>
</template>
