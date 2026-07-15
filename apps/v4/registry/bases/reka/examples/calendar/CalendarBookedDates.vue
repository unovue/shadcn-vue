<script setup lang="ts">
import { CalendarDate } from "@internationalized/date"
import { ref } from "vue"
import { Calendar } from "@/registry/bases/reka/ui/calendar"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Example } from "~/registry/bases/reka/components/example"

const date = ref<CalendarDate>(
  new CalendarDate(
    new Date().getFullYear(),
    2,
    3,
  ),
)

const bookedDates = Array.from(
  { length: 15 },
  (_, i) => new CalendarDate(
    new Date().getFullYear(),
    2,
    12 + i,
  ),
)
</script>

<template>
  <Example title="Booked Dates">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          v-model="(date as any)"
          :disabled="(bookedDates as any)"
          :is-date-unavailable="(date) => bookedDates.some(d => d.compare(date as any) === 0)"
        />
      </CardContent>
    </Card>
  </Example>
</template>
