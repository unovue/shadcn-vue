<script lang="ts" setup>
import type { RangeCalendarGridProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { RangeCalendarGrid, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<RangeCalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarGrid
    :class="cn('w-full border-collapse space-y-1', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGrid>
</template>
