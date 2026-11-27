<script setup lang="ts">
import type { RangeCalendarRootValue } from "@vase-ui/vue/range-calendar"
import { ref } from "vue"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { RangeCalendar } from "@/registry/bases/vase/ui/range-calendar"
import { Example } from "~/registry/bases/vase/components/example"

installTemporal()

const range = ref<RangeCalendarRootValue>([
  new Temporal.PlainDate(new Date().getFullYear(), 12, 8),
  new Temporal.PlainDate(new Date().getFullYear(), 12, 18),
])
</script>

<template>
  <Example title="Custom Days">
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <RangeCalendar
          v-model="range"
          :number-of-months="1"
          layout="month-and-year"
          class="[--rdp-cell-size:theme(spacing.10)] md:[--rdp-cell-size:theme(spacing.12)]"
        />
      </CardContent>
    </Card>
  </Example>
</template>
