<script setup lang="ts">
import { addDays, format } from 'date-fns'
import { ref } from 'vue'
import { CalendarIcon } from '@radix-icons/vue'

import { cn } from '@/lib/utils'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'

const date = ref({
  start: new Date(2022, 0, 20),
  end: addDays(new Date(2022, 0, 20), 20),
})
</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="cn(
            'w-[300px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <span>
            {{ date.start ? (
              date.end ? `${format(date.start, 'LLL dd, y')} - ${format(date.end, 'LLL dd, y')}`
              : format(date.start, 'LLL dd, y')
            ) : 'Pick a date' }}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          v-model.range="date"
          mode="date"
          :columns="2"
        >
          <template #footer>
            <div class="flex w-full mt-6 border-t border-accent pt-4">
              <div class="w-1/2">
                <strong>Entry time</strong>
                <Calendar
                  v-model="date.start"
                  mode="time"
                  hide-time-header
                />
              </div>
              <div class="w-1/2">
                <strong>Exit time</strong>
                <Calendar
                  v-model="date.end"
                  mode="time"
                  hide-time-header
                />
              </div>
            </div>
          </template>
        </Calendar>
      </PopoverContent>
    </Popover>
  </div>
</template>
