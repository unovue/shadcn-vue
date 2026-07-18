<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="alert-action"
    :class="cn('absolute top-2.5 right-3', props.class)"
  >
    <slot />
  </div>
</template>
