<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="cn('text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-[0.625rem] tracking-widest', props.class)"
  >
    <slot />
  </span>
</template>
