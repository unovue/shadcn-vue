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
    data-slot="range-calendar-cell"
    :class="cn('relative p-0 text-center text-sm focus-within:relative focus-within:z-20 data-[range-start]:bg-accent data-[range-middle]:bg-accent data-[range-end]:bg-accent data-[range-start]:rounded-l-md data-[range-end]:rounded-r-md first:data-[range-middle]:rounded-l-md last:data-[range-middle]:rounded-r-md', props.class)"
  >
    <slot />
  </Calendar.Day>
</template>
