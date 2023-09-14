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
        'flex flex-col space-y-2 sm:space-y-0 mt-3.5 sm:flex-row sm:justify-end sm:space-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
