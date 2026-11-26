<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import { ref } from 'vue'
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

const date = ref(Temporal.Now.plainDateISO())
const open = ref(false)
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-3">
      <Label for="date-picker" class="px-1">
        Date
      </Label>
      <Popover v-model:open="open">
        <PopoverTrigger>
          <template #element="{ props, elementRef }">
            <Button
              v-bind="props"
              id="date-picker"
              :ref="elementRef"
              variant="outline"
              class="w-32 justify-between font-normal"
            >
              {{ date ? date.toLocaleString() : "Select date" }}
              <ChevronDownIcon />
            </Button>
          </template>
        </PopoverTrigger>
        <PopoverContent class="w-auto overflow-hidden p-0" align="start">
          <Calendar
            :model-value="date"
            @update:model-value="(value) => {
              if (value) {
                date = value
                open = false
              }
            }"
          />
        </PopoverContent>
      </Popover>
    </div>
    <div class="flex flex-col gap-3">
      <Label for="time-picker" class="px-1">
        Time
      </Label>
      <Input
        id="time-picker"
        type="time"
        step="1"
        default-value="10:30:00"
        class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  </div>
</template>
