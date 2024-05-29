<script setup lang="ts">
import { ref } from 'vue'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/lib/registry/default/ui/calendar'
import { Button } from '@/lib/registry/default/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/default/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/registry/default/ui/select'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const items = [
  { value: 0, label: 'Today' },
  { value: 1, label: 'Tomorrow' },
  { value: 3, label: 'In 3 days' },
  { value: 7, label: 'In a week' },
]

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
        <CalendarIcon class="mr-2 size-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Select
        @update:model-value="(v) => {
          if (!v) return;
          value = today(getLocalTimeZone()).add({ days: Number(v) });
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="item in items" :key="item.value" :value="item.value.toString()">
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Calendar v-model="value" />
    </PopoverContent>
  </Popover>
</template>
