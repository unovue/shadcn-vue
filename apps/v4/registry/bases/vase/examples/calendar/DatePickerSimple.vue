<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import { Calendar } from "@/registry/bases/vase/ui/calendar"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/vase/ui/popover"
import { Example } from "~/registry/bases/vase/components/example"

const date = ref<Temporal.PlainDate>()

function formatDate(date?: Temporal.PlainDate): string {
  if (!date)
    return ""
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
</script>

<template>
  <Example title="Date Picker Simple">
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-simple">
        Date
      </FieldLabel>
      <Popover>
        <PopoverTrigger>
          <template #element="{ props, elementRef }">
            <Button
              v-bind="props" id="date-picker-simple"
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
              <span v-if="date">{{ formatDate(date) }}</span>
              <span v-else>Pick a date</span>
            </Button>
          </template>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <Calendar v-model="date" />
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
