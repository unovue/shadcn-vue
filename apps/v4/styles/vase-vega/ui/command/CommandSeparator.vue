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
    :class="cn('bg-border -mx-1 h-px w-auto', props.class)"
  />
</template>
