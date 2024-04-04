<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

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
