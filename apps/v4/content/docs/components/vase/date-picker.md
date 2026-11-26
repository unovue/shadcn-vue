---
title: Date Picker
description: A date picker component with range and presets.
component: true
links:
  doc: https://vase-ui.com/components/date-picker
  api: https://vase-ui.com/components/date-picker#api-reference
---

::component-preview
---
name: DatePickerDemo
description: A date picker component.
---
::

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/vase/popover) and the [Calendar](/docs/components/vase/calendar) components.

## Usage

```vue showLineNumbers
<script setup lang="ts">
import { CalendarIcon } from '@lucide/vue'
import { cn } from 'cn'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
          :class="cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ date ? date.toLocaleString() : "Pick a date" }}
        </Button>
      </template>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="date"
        autofocus
        layout="month-and-year"
        @update:model-value="open = false"
      />
    </PopoverContent>
  </Popover>
</template>
```
