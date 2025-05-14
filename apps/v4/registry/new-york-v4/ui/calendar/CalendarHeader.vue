<script lang="ts" setup>
import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeader
    data-slot="calendar-header"
    :class="cn('flex justify-center pt-1 relative items-center w-full', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
