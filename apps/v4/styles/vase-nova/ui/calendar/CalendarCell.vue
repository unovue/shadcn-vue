<script lang="ts" setup>
import type { CalendarDayProps } from '@vase-ui/vue/calendar'
import type { HTMLAttributes } from 'vue'
import { Calendar } from '@vase-ui/vue/calendar'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ CalendarDayProps {
  class?: HTMLAttributes['class']
  day: CalendarDayProps['day']
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Day
    :day="day"
    data-slot="calendar-cell"
    :class="cn('relative p-0 text-center text-sm flex-1 focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent', props.class)"
  >
    <slot />
  </Calendar.Day>
</template>
