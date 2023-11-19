---
title: Date Picker
description: A date picker component with range and presets.
---

<script setup>
import { useConfigStore } from '@/stores/config'

const { codeConfig } = useConfigStore()
</script>



<ComponentPreview name="DatePickerDemo"  /> 

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/popover#installation) and the [Calendar](/docs/components/calendar#installation) components.

## Usage

```vue-vue
<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '{{codeConfig.aliases.utils}}'
import { {{codeConfig.prefix}}Button } from '{{codeConfig.aliases.components}}/ui/button'
import { {{codeConfig.prefix}}Calendar } from '{{codeConfig.aliases.components}}/ui/calendar'
import {
  {{codeConfig.prefix}}Popover,
  {{codeConfig.prefix}}PopoverContent,
  {{codeConfig.prefix}}PopoverTrigger,
} from '{{codeConfig.aliases.components}}/ui/popover'

const date = ref<Date>()
</script>

<template>
  <{{codeConfig.prefix}}Popover>
    <{{codeConfig.prefix}}PopoverTrigger as-child>
      <{{codeConfig.prefix}}Button
        :variant="'outline'"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !date && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? format(date, "PPP") : "Pick a date" }}</span>
      </{{codeConfig.prefix}}Button>
    </{{codeConfig.prefix}}PopoverTrigger>
    <{{codeConfig.prefix}}PopoverContent class="w-auto p-0">
      <{{codeConfig.prefix}}Calendar v-model="date" />
    </{{codeConfig.prefix}}PopoverContent>
  </{{codeConfig.prefix}}Popover>
</template>
```


## Examples

### Date Picker

<ComponentPreview name="DatePickerDemo"  />

### Date Range Picker

<ComponentPreview name="DatePickerWithRange"  />

### With Presets

<ComponentPreview name="DatePickerWithPresets"  />

### Form

<ComponentPreview name="DatePickerForm"  />
