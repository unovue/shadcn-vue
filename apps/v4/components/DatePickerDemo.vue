<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
// import { DateRange } from "react-day-picker"

import { CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'
import { RangeCalendar } from '@/registry/new-york-v4/ui/range-calendar'

const date = ref() as Ref<DateValue>

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const dateRange = ref({
  start: new CalendarDate(new Date().getFullYear(), 0, 20),
  end: new CalendarDate(new Date().getFullYear(), 0, 20).add({ days: 20 }),
}) as Ref<{ start: DateValue, end: DateValue }>

const drf = new DateFormatter('en-US', {
  dateStyle: 'medium',
})
</script>

<template>
  <div class="flex flex-col items-start gap-4 md:flex-row">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          :variant="'outline'"
          :class="cn(
            'min-w-[200px] justify-start px-2 font-normal',
            !date && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="text-muted-foreground" />
          {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          v-model="date"
          initial-focus
        />
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="cn(
            'w-fit justify-start px-2 font-normal',
            !dateRange && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="text-muted-foreground" />

          <template v-if="dateRange.start">
            <template v-if="dateRange.end">
              {{ drf.format(dateRange.start.toDate(getLocalTimeZone())) }} - {{ drf.format(dateRange.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ drf.format(dateRange.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else>
            Pick a date
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <RangeCalendar
          v-model="dateRange"
          :number-of-months="2"
          initial-focus
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
