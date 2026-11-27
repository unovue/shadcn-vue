<script setup lang="ts">
import type { RangeCalendarRootValue } from "@vase-ui/vue/range-calendar"
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { installTemporal } from "@/registry/bases/vase/lib/temporal"
import { Button } from "@/registry/bases/vase/ui/button"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/vase/ui/popover"
import { RangeCalendar } from "@/registry/bases/vase/ui/range-calendar"
import { Example } from "~/registry/bases/vase/components/example"

installTemporal()

const date = ref<RangeCalendarRootValue>([
  new Temporal.PlainDate(new Date().getFullYear(), 1, 20),
  new Temporal.PlainDate(new Date().getFullYear(), 2, 9),
])

function formatDate(date?: Temporal.PlainDate | null): string {
  if (!date)
    return ""
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatDateRange(range: RangeCalendarRootValue): string {
  const [start, end] = range
  if (!start)
    return ""
  if (!end)
    return formatDate(start)
  return `${formatDate(start)} - ${formatDate(end)}`
}
</script>

<template>
  <Example title="Date Picker Range">
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-range">
        Date Picker Range
      </FieldLabel>
      <Popover>
        <PopoverTrigger>
          <template #element="{ props, elementRef }">
            <Button
              v-bind="props" id="date-picker-range"
              :ref="elementRef"
              variant="outline"
              class="justify-start px-2.5 font-normal"
            >
              <IconPlaceholder
                lucide="CalendarIcon"
                tabler="IconCalendar"
                hugeicons="CalendarIcon"
                phosphor="CalendarIcon"
                remixicon="RiCalendarLine"
                data-icon="inline-start"
              />
              <span v-if="date[0]">{{ formatDateRange(date) }}</span>
              <span v-else>Pick a date</span>
            </Button>
          </template>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <RangeCalendar
            v-model="date"
            :number-of-months="2"
          />
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
