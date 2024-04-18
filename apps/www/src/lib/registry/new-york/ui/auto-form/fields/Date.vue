<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from '@radix-icons/vue'
import { beautifyObjectName } from '../utils'
import AutoFormLabel from '../AutoFormLabel.vue'
import type { ConfigItem } from '../interface'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'

import { Calendar } from '@/lib/registry/new-york/ui/calendar'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { cn } from '@/lib/utils'

defineProps<{
  name: string
  required?: boolean
  config?: ConfigItem
}>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <AutoFormLabel :required="required">
        {{ config?.label || beautifyObjectName(name) }}
      </AutoFormLabel>
      <FormControl>
        <div>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="cn(
                  'w-full justify-start text-left font-normal',
                  !componentField.modelValue && 'text-muted-foreground',
                )"
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ componentField.modelValue ? df.format(componentField.modelValue.toDate(getLocalTimeZone())) : "Pick a date" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar initial-focus v-bind="{ ...componentField }" />
            </PopoverContent>
          </Popover>
        </div>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
