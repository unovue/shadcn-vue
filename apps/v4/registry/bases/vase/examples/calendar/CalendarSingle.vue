<script setup lang="ts">
import { ref } from "vue"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"

const date = ref(
  new Temporal.PlainDate(
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
          v-model="date"
          layout="month-and-year"
        />
      </CardContent>
    </Card>
  </Example>
</template>
