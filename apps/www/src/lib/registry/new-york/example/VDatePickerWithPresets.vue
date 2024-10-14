<script setup lang="ts">
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { Calendar } from '@/lib/registry/new-york/ui/v-calendar'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-icons/vue'
import { addDays, format } from 'date-fns'
import { ref } from 'vue'

const date = ref<Date>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="date">
          {{ format(date, "PPP") }}
        </template>
        <template v-else>
          <span>Pick a date</span>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col space-y-2 p-2">
      <Select
        @update:model-value="(value) => {
          date = addDays(new Date(), parseInt(value))
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="0">
            Today
          </SelectItem>
          <SelectItem value="1">
            Tomorrow
          </SelectItem>
          <SelectItem value="3">
            In 3 days
          </SelectItem>
          <SelectItem value="7">
            In a week
          </SelectItem>
        </SelectContent>
      </Select>
      <div class="rounded-md border">
        <Calendar v-model="date" mode="single" />
      </div>
    </PopoverContent>
  </Popover>
</template>
