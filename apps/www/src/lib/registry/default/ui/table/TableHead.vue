<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <th
    :class="
      cn(
        'px-4 h-12 text-left font-medium text-sm whitespace-nowrap text-muted',
        props.class,
      )
    "
  >
    <slot />
  </th>
</template>
