---
title: VCalendar Date Picker
description: A date picker component with range and presets.
---

<ComponentPreview name="VDatePickerDemo"  />

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Calendar](/docs/components/calendar#installation) components.

## Usage

```vue
<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/v-calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
        <span>{{ date ? format(date, "PPP") : "Pick a date" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" />
    </PopoverContent>
  </Popover>
</template>
```

## Examples

### Date Picker

<ComponentPreview name="VDatePickerDemo"  />

### Date Range Picker

<ComponentPreview name="VDatePickerWithRange"  />

### Date Time Picker

<ComponentPreview name="VDateTimePickerDemo"  />

### With Presets

<ComponentPreview name="VDatePickerWithPresets"  />

### With Slot

<ComponentPreview name="VRangePickerWithSlot"  />

### Form

<ComponentPreview name="VDatePickerForm"  />
