<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('container-wrapper scroll-mt-24', props.class)">
    <div class="container flex items-center justify-between gap-4 py-4">
      <slot />
    </div>
  </div>
</template>
