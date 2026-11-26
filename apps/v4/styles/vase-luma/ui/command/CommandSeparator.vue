<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="command-separator"
    role="separator"
    :class="cn('bg-border/50 my-1.5 h-px', props.class)"
  />
</template>
