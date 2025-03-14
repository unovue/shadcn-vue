<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    :class="
      cn(
        'mt-3.5 flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
