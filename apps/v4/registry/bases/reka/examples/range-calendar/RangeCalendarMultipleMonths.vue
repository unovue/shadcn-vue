<script setup lang="ts">
import type { DateRange } from "reka-ui"
import { CalendarDate } from "@internationalized/date"
import { ref } from "vue"
import { RangeCalendar } from "@/registry/bases/reka/ui/range-calendar"
import { Example } from "~/registry/bases/reka/components/example"

const range = ref({
  start: new CalendarDate(new Date().getFullYear(), 1, 10),
  end: new CalendarDate(new Date().getFullYear(), 2, 15),
} as DateRange)
</script>

<template>
  <Example title="Range Calendar with Multiple Months">
    <RangeCalendar v-model="(range as any)" :number-of-months="2" />
  </Example>
</template>
