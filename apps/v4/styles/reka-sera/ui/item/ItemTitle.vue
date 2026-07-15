<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="item-title"
    :class="cn('gap-2 text-xs leading-snug font-semibold uppercase underline-offset-4 cn-font-heading line-clamp-1 flex w-fit items-center', props.class)"
  >
    <slot />
  </div>
</template>
