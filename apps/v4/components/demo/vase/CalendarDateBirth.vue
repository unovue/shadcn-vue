<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Button } from '@/styles/vase-vega/ui/button'
import { Calendar } from '@/styles/vase-vega/ui/calendar'
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
  <div class="flex flex-col gap-3">
    <Label for="date" class="px-1">
      Date of birth
    </Label>
    <Popover v-model:open="open">
      <PopoverTrigger>
        <template #element="{ props, elementRef }">
          <Button
            v-bind="props"
            id="date"
            :ref="elementRef"
            variant="outline"
            class="w-48 justify-between font-normal"
          >
            {{ date ? date.toLocaleString() : "Select date" }}
            <ChevronDownIcon />
          </Button>
        </template>
      </PopoverTrigger>
      <PopoverContent class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          :model-value="date"
          layout="month-and-year"
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
</template>
