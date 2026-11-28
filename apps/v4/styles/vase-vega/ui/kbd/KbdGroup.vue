<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <kbd
    data-slot="kbd-group"
    :class="cn('gap-1 inline-flex items-center', props.class)"
  >
    <slot />
  </kbd>
</template>
