<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  status?: 'running' | 'error' | 'pending'
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="trace-line"
    :data-status="status"
    :class="cn(
      'gap-2 text-sm flex w-fit max-w-full min-w-0 items-center text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
