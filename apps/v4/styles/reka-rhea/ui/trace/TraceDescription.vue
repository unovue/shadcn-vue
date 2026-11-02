<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="trace-description"
    :class="cn('shrink-0 text-muted-foreground/70 tabular-nums', props.class)"
  >
    <slot />
  </span>
</template>
