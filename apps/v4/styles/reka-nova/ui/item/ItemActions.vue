<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="item-actions"
    :class="cn('gap-2 flex items-center', props.class)"
  >
    <slot />
  </div>
</template>
