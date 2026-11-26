<script lang="ts" setup>
import type { CalendarGridBodyProps } from "@vase-ui/vue/calendar"
import { Calendar } from "@vase-ui/vue/calendar"

interface Props extends /* @vue-ignore */ CalendarGridBodyProps {}

defineProps<Props>()
</script>

<template>
  <Calendar.GridBody data-slot="calendar-grid-body">
    <slot />
    <template v-if="$slots.week" #week="slotProps">
      <slot name="week" v-bind="slotProps" />
    </template>
  </Calendar.GridBody>
</template>
