<script lang="ts" setup>
import type { CalendarDayProps } from "@vase-ui/vue/calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ CalendarDayProps {
  class?: HTMLAttributes["class"]
  day: CalendarDayProps["day"]
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Day
    :day="day"
    data-slot="range-calendar-cell"
    :class="cn(
      'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
      // A hidden day has no button. It keeps the width of a day and takes no accent.
      'w-8 [&:has([data-selected])]:bg-accent',
      'first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-range-end])]:rounded-r-md [&:has([data-selected][data-range-start])]:rounded-l-md',
      props.class,
    )"
  >
    <slot />
  </Calendar.Day>
</template>
