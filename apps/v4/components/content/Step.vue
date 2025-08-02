<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    :class="cn(
      'font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight', props.class,
    )"
  >
    <slot mdc-unwrap="p" />
  </h3>
</template>
