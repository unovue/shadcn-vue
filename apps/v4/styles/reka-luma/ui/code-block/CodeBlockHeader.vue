<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="code-block-header"
    :class="cn('gap-2 px-5 pt-5 text-muted-foreground group-data-[variant=destructive]/code-block:text-destructive group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-3 flex min-w-0 shrink-0 items-center *:has-[>[data-slot=code-block-title]]:min-w-0', props.class)"
  >
    <slot />
  </div>
</template>
