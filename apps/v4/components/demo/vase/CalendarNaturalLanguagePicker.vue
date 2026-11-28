<script lang="ts">
export function formatDate(date: Temporal.PlainDate | null | undefined) {
  if (!date) {
    return ''
  }
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<script setup lang="ts">
import { CalendarIcon } from '@lucide/vue'
import { parseDate } from 'chrono-node'
import { computed, ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Button } from '@/styles/vase-vega/ui/button'
import { Calendar } from '@/styles/vase-vega/ui/calendar'
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/styles/vase-vega/ui/popover'

installTemporal()

const inputValue = ref('In 2 days')
const date = computed(() => {
  const parsed = parseDate(inputValue.value)
  return parsed
    ? new Temporal.PlainDate(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate())
    : null
})
const open = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3">
    <Label for="date" class="px-1">
      Schedule Date
    </Label>
    <div class="relative flex gap-2">
      <Input
        id="date"
        :model-value="inputValue"
        placeholder="Tomorrow or next week"
        class="bg-background pr-10"
        @update:model-value="(value) => {
          if (value) {
            inputValue = value.toString()
          }
        }"
      />
      <Popover v-model:open="open">
        <PopoverTrigger>
          <template #element="{ props, elementRef }">
            <Button
              v-bind="props"
              id="date-picker"
              :ref="elementRef"
              variant="ghost"
              class="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon class="size-3.5" />
              <span class="sr-only">Select date</span>
            </Button>
          </template>
        </PopoverTrigger>
        <PopoverContent class="w-auto overflow-hidden p-0" align="end">
          <Calendar
            :model-value="date"
            @update:model-value="(value) => {
              if (value) {
                inputValue = formatDate(value)
                open = false
              }
            }"
          />
        </PopoverContent>
      </Popover>
    </div>
    <div class="text-muted-foreground px-1 text-sm">
      Your post will be published on
      <span class="font-medium">{{ formatDate(date) }}</span>.
    </div>
  </div>
</template>
