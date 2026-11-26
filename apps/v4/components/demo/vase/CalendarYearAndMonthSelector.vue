<script setup lang="ts">
import type { LayoutTypes } from '@/styles/vase-vega/ui/calendar'
import { ref } from 'vue'
import { installTemporal } from '@/registry/bases/vase/lib/temporal'
import { Calendar } from '@/styles/vase-vega/ui/calendar'
import { Label } from '@/styles/vase-vega/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/styles/vase-vega/ui/select'

installTemporal()

const date = ref(Temporal.Now.plainDateISO())
const layout = ref<LayoutTypes>('month-and-year')
const layouts = {
  'month-and-year': 'Month and Year',
  'month-only': 'Month Only',
  'year-only': 'Year Only',
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Calendar
      v-model="date"
      class="rounded-md border shadow-sm"
      :layout
      :show-outside-days="false"
    />
    <div class="flex flex-col gap-3">
      <Label for="dropdown" class="px-1">
        Dropdown
      </Label>
      <Select
        v-model="layout"
        :items="layouts"
      >
        <SelectTrigger
          id="dropdown"
          size="sm"
          class="bg-background w-full"
        >
          <SelectValue placeholder="Dropdown" />
        </SelectTrigger>
        <SelectContent align="center">
          <SelectItem value="month-and-year">
            Month and Year
          </SelectItem>
          <SelectItem value="month-only">
            Month Only
          </SelectItem>
          <SelectItem value="year-only">
            Year Only
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
