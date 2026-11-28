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
const open = ref(false)

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
  <Example title="Date Picker with Dropdowns">
    <Field class="mx-auto w-72">
      <FieldLabel for="date-picker-with-dropdowns-desktop">
        Date
      </FieldLabel>
      <Popover v-model:open="open">
        <PopoverTrigger>
          <template #element="{ props, elementRef }">
            <Button
              v-bind="props" id="date-picker-with-dropdowns-desktop"
              :ref="elementRef"
              variant="outline"
              class="justify-start px-2.5 font-normal"
            >
              <span v-if="date">{{ formatDate(date) }}</span>
              <span v-else>Pick a date</span>
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDownIcon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
                class="ml-auto"
              />
            </Button>
          </template>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <Calendar
            v-model="date"
            layout="month-and-year"
          />
          <div class="flex gap-2 border-t p-2">
            <Button
              variant="outline"
              size="sm"
              class="w-full"
              @click="open = false"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
