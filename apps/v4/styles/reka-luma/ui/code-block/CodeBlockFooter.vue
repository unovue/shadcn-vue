<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="code-block-footer"
    :class="cn('gap-2 px-5 pb-5 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pb-3 flex min-w-0 shrink-0 items-center', props.class)"
  >
    <slot />
  </div>
</template>
