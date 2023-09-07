<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: string }>(),
  {
    class: '',
    modelValue: 0,
  },
)
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        props.class,
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="
        cn(
          'h-full w-full flex-1 bg-primary transition-all',
          props.class,
        )
      "
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
