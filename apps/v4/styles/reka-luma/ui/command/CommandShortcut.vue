<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="command-shortcut"
    :class="cn('text-muted-foreground group-data-selected/command-item:text-foreground ml-auto text-xs tracking-widest', props.class)"
  >
    <slot />
  </span>
</template>
