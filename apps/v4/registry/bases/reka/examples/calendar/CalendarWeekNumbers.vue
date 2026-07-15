<script setup lang="ts">
import { CalendarDate } from "@internationalized/date"
import { ref } from "vue"
import { Calendar } from "@/registry/bases/reka/ui/calendar"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Example } from "~/registry/bases/reka/components/example"

const date = ref<CalendarDate>(
  new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    3,
  ),
)
</script>

<template>
  <Example title="Week Numbers" class="justify-center">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          v-model="(date as any)"
          :week-starts-on="1"
          show-week-number
        />
      </CardContent>
    </Card>
  </Example>
</template>
