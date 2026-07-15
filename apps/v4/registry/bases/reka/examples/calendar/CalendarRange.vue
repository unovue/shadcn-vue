<script setup lang="ts">
import type { DateRange } from "reka-ui"
import { CalendarDate } from "@internationalized/date"
import { ref } from "vue"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { RangeCalendar } from "@/registry/bases/reka/ui/range-calendar"
import { Example } from "~/registry/bases/reka/components/example"

const dateRange = ref({
  start: new CalendarDate(new Date().getFullYear(), 1, 12),
  end: new CalendarDate(new Date().getFullYear(), 2, 11),
} as DateRange)
</script>

<template>
  <Example
    title="Range"
    container-class="lg:col-span-full 2xl:col-span-full"
    class="p-12"
  >
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <RangeCalendar
          v-model="(dateRange as any)"
          :number-of-months="2"
        />
      </CardContent>
    </Card>
  </Example>
</template>
