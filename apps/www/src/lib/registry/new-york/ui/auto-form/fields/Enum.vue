<script setup lang="ts">
import { computed } from 'vue'
import { beautifyObjectName } from '../utils'
import type { ConfigItem } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/registry/new-york/ui/select'
import { Label } from '@/lib/registry/new-york/ui/label'
import { RadioGroup, RadioGroupItem } from '@/lib/registry/new-york/ui/radio-group'

const props = defineProps<{
  name: string
  required?: boolean
  options?: string[]
  config?: ConfigItem
}>()

const computedOptions = computed(() => props.config?.enumProps?.options || props.options)
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(name) }}
      </AutoFormLabel>
      <FormControl>
        <RadioGroup v-if="config?.component === 'radio'" :orientation="'vertical'" v-bind="{ ...componentField }">
          <div v-for="(option, index) in computedOptions" :key="option" class="mb-2 flex items-center gap-3 space-y-0">
            <RadioGroupItem :id="`${option}-${index}`" :value="option" />
            <Label :for="`${option}-${index}`">{{ beautifyObjectName(option) }}</Label>
          </div>
        </RadioGroup>

        <Select v-else v-bind="{ ...componentField }">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="config?.enumProps?.placeholder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="option in computedOptions" :key="option" :value="option">
              {{ beautifyObjectName(option) }}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
