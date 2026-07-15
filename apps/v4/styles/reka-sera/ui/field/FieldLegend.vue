<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'legend' | 'label'
}>(), {
  variant: 'legend',
})
</script>

<template>
  <legend
    data-slot="field-legend"
    :data-variant="variant"
    :class="cn('mb-3 font-semibold uppercase data-[variant=label]:text-xs data-[variant=legend]:text-xs', props.class)"
  >
    <slot />
  </legend>
</template>
