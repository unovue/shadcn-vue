<script setup lang="ts">
import { ref } from 'vue'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'

import { CalendarIcon } from '@radix-icons/vue'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
