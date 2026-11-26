<script setup lang="ts">
import { ref } from "vue"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"

const date = ref(
  new Temporal.PlainDate(
    new Date().getFullYear(),
    2,
    3,
  ),
)

const bookedDates = Array.from(
  { length: 15 },
  (_, i) => new Temporal.PlainDate(
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
          v-model="date"
          :unavailable-dates="bookedDates"
        />
      </CardContent>
    </Card>
  </Example>
</template>
