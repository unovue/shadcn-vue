<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="popover-title"
    :class="cn('text-xs font-semibold uppercase cn-font-heading', props.class)"
  >
    <slot />
  </div>
</template>
