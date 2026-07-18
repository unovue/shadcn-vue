<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FieldVariants } from '.'
import { cn } from '@/lib/utils'
import { fieldVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  orientation?: FieldVariants['orientation']
}>(), {
  orientation: 'vertical',
})
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(
      fieldVariants({ orientation }),
      props.class,
    )"
  >
    <slot />
  </div>
</template>
