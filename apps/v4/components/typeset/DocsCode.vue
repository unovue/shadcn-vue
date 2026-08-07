<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  code: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class="relative rounded-lg bg-muted/60">
    <pre :class="cn('scrollbar-none overflow-x-auto p-3 font-mono text-sm leading-relaxed', props.class)">{{ code }}</pre>
  </div>
</template>
