<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'

import { Calendar } from '@/lib/registry/default/ui/v-calendar'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

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
            'w-[280px] justify-start text-left font-normal',
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
          :columns="2"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
