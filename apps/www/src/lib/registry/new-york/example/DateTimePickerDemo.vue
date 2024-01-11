<script setup lang="ts">
import { format } from 'date-fns'
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

const date = ref<Date>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :variant="'outline'"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? format(date, 'PPP - hh:mm') : "Pick a date" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" mode="datetime" />
    </PopoverContent>
  </Popover>
</template>
