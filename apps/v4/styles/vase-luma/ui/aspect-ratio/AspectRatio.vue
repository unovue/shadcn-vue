<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = withDefaults(defineProps<{
  ratio?: number
  class?: HTMLAttributes['class']
}>(), {
  ratio: 1,
})
</script>

<template>
  <div
    data-slot="aspect-ratio"
    :style="{ '--ratio': ratio }"
    :class="cn('relative aspect-(--ratio)', props.class)"
  >
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>
