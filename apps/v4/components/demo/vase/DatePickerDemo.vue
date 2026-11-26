<script setup lang="ts">
import { CalendarIcon } from '@lucide/vue'
import { cn } from 'cn'
import { ref } from 'vue'
import { Button } from '@/styles/vase-vega/ui/button'
import { Calendar } from '@/styles/vase-vega/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/styles/vase-vega/ui/popover'

const date = ref<Temporal.PlainDate | null>(null)
const open = ref(false)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
          variant="outline"
          :class="cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')"
        >
          <CalendarIcon />
          {{ date ? date.toLocaleString('en-US', { dateStyle: 'long' }) : "Pick a date" }}
        </Button>
      </template>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        layout="month-and-year"
        autofocus
        @update:model-value="open = false"
      />
    </PopoverContent>
  </Popover>
</template>
