<script setup lang="ts">
import { CalendarDate } from "@internationalized/date"
import { ref } from "vue"
import { Calendar } from "@/registry/bases/reka/ui/calendar"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Example } from "~/registry/bases/reka/components/example"

const date = ref(
  new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    12,
  ),
)
</script>

<template>
  <Example title="Single">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          :model-value="date as any"
          layout="month-and-year"
          @update:model-value="(value) => date = value as typeof date"
        />
      </CardContent>
    </Card>
  </Example>
</template>
