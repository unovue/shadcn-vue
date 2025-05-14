<script lang="ts" setup>
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeader
    data-slot="range-calendar-header"
    :class="cn('flex justify-center pt-1 relative items-center w-full', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeader>
</template>
