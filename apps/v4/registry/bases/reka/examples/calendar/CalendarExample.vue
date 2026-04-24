<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CalendarBookedDates from "~/registry/bases/reka/examples/calendar/CalendarBookedDates.vue"
import CalendarCustomDays from "~/registry/bases/reka/examples/calendar/CalendarCustomDays.vue"
import CalendarMultiple from "~/registry/bases/reka/examples/calendar/CalendarMultiple.vue"
import CalendarRange from "~/registry/bases/reka/examples/calendar/CalendarRange.vue"
import CalendarRangeMultipleMonths from "~/registry/bases/reka/examples/calendar/CalendarRangeMultipleMonths.vue"
import CalendarSingle from "~/registry/bases/reka/examples/calendar/CalendarSingle.vue"
import CalendarWeekNumbers from "~/registry/bases/reka/examples/calendar/CalendarWeekNumbers.vue"
import CalendarWithPresets from "~/registry/bases/reka/examples/calendar/CalendarWithPresets.vue"
import CalendarWithTime from "~/registry/bases/reka/examples/calendar/CalendarWithTime.vue"
import DatePickerSimple from "~/registry/bases/reka/examples/calendar/DatePickerSimple.vue"
import DatePickerWithDropdowns from "~/registry/bases/reka/examples/calendar/DatePickerWithDropdowns.vue"
import DatePickerWithRange from "~/registry/bases/reka/examples/calendar/DatePickerWithRange.vue"
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
