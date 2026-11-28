<script setup lang="ts">
import { ref } from "vue"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { Button } from "@/registry/bases/vase/ui/button"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Card, CardContent, CardFooter } from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"

installTemporal()

const date = ref(
  new Temporal.PlainDate(
    new Date().getFullYear(),
    2,
    12,
  ),
)

const currentMonth = ref(
  new Temporal.PlainYearMonth(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
  ),
)

function handlePreset(daysToAdd: number) {
  const newDate = Temporal.Now.plainDateISO().add({ days: daysToAdd })
  date.value = newDate
  currentMonth.value = newDate.toPlainYearMonth()
}

const presets = [
  { label: "Today", value: 0 },
  { label: "Tomorrow", value: 1 },
  { label: "In 3 days", value: 3 },
  { label: "In a week", value: 7 },
  { label: "In 2 weeks", value: 14 },
]
</script>

<template>
  <Example title="With Presets">
    <Card class="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent class="px-4">
        <Calendar
          v-model="date"
          v-model:month="currentMonth"
          fixed-weeks
          class="p-0 [--rdp-cell-size:theme(spacing.9.5)]"
        />
      </CardContent>
      <CardFooter class="flex flex-wrap gap-2 border-t">
        <Button
          v-for="preset in presets"
          :key="preset.value"
          variant="outline"
          size="sm"
          class="flex-1"
          @click="handlePreset(preset.value)"
        >
          {{ preset.label }}
        </Button>
      </CardFooter>
    </Card>
  </Example>
</template>
