<script setup lang="ts">
import type { RangeCalendarRootValue } from "@vase-ui/vue/range-calendar"
import { ref } from "vue"
import { Card, CardContent } from "@/registry/bases/vase/ui/card"
import { RangeCalendar } from "@/registry/bases/vase/ui/range-calendar"
import { Example } from "~/registry/bases/vase/components/example"

const dateRange = ref<RangeCalendarRootValue>([
  new Temporal.PlainDate(new Date().getFullYear(), 1, 12),
  new Temporal.PlainDate(new Date().getFullYear(), 2, 11),
])
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
          v-model="dateRange"
          :number-of-months="2"
        />
      </CardContent>
    </Card>
  </Example>
</template>
