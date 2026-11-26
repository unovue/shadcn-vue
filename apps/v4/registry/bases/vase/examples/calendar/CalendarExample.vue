<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import CalendarBookedDates from "~/registry/bases/vase/examples/calendar/CalendarBookedDates.vue"
import CalendarCustomDays from "~/registry/bases/vase/examples/calendar/CalendarCustomDays.vue"
import CalendarMultiple from "~/registry/bases/vase/examples/calendar/CalendarMultiple.vue"
import CalendarRange from "~/registry/bases/vase/examples/calendar/CalendarRange.vue"
import CalendarRangeMultipleMonths from "~/registry/bases/vase/examples/calendar/CalendarRangeMultipleMonths.vue"
import CalendarSingle from "~/registry/bases/vase/examples/calendar/CalendarSingle.vue"
import CalendarWeekNumbers from "~/registry/bases/vase/examples/calendar/CalendarWeekNumbers.vue"
import CalendarWithPresets from "~/registry/bases/vase/examples/calendar/CalendarWithPresets.vue"
import CalendarWithTime from "~/registry/bases/vase/examples/calendar/CalendarWithTime.vue"
import DatePickerSimple from "~/registry/bases/vase/examples/calendar/DatePickerSimple.vue"
import DatePickerWithDropdowns from "~/registry/bases/vase/examples/calendar/DatePickerWithDropdowns.vue"
import DatePickerWithRange from "~/registry/bases/vase/examples/calendar/DatePickerWithRange.vue"
</script>

<template>
  <ExampleWrapper>
    <CalendarSingle />
    <CalendarMultiple />
    <CalendarWeekNumbers />
    <CalendarBookedDates />
    <CalendarRange />
    <CalendarRangeMultipleMonths />
    <CalendarWithTime />
    <CalendarWithPresets />
    <CalendarCustomDays />
    <DatePickerSimple />
    <DatePickerWithDropdowns />
    <DatePickerWithRange />
  </ExampleWrapper>
</template>
