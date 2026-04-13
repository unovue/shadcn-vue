<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="item-footer"
    :class="cn('gap-2 flex basis-full items-center justify-between', props.class)"
  >
    <slot />
  </div>
</template>
