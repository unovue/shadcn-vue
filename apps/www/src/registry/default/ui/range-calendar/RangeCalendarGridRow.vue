<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<RangeCalendarGridRowProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarGridRow :class="cn('flex mt-2 w-full', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarGridRow>
</template>
