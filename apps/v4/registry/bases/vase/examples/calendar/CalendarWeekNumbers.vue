<script setup lang="ts">
import { ref } from "vue"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"

installTemporal()

const date = ref(
  new Temporal.PlainDate(
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
          v-model="date"
          :first-day-of-week="1"
          show-week-number
        />
      </CardContent>
    </Card>
  </Example>
</template>
