<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <td
    :class="
      cn(
        'p-4 whitespace-nowrap align-middle text-sm text-foreground',
        props.class,
      )
    "
  >
    <slot />
  </td>
</template>
