<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    :class="cn(
      'text-muted-foreground gap-2 text-xs/relaxed [&_svg:not([class*=size-])]:size-4 flex items-center [&_svg]:pointer-events-none',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
