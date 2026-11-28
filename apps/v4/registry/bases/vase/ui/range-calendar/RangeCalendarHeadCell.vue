<script lang="ts" setup>
import type { CalendarWeekdayProps } from "@vase-ui/vue/calendar"
import type { HTMLAttributes } from "vue"
import { Calendar } from "@vase-ui/vue/calendar"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ CalendarWeekdayProps {
  class?: HTMLAttributes["class"]
  weekday: CalendarWeekdayProps["weekday"]
}

const props = defineProps<Props>()
</script>

<template>
  <Calendar.Weekday
    :weekday="weekday"
    format="narrow"
    data-slot="range-calendar-head-cell"
    :class="cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', props.class)"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Calendar.Weekday>
</template>
