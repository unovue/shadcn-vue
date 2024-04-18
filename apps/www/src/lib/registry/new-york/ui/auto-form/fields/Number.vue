<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { Config, ConfigItem } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  name: string
  required?: boolean
  config?: ConfigItem
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(name) }}
      </AutoFormLabel>
      <FormControl>
        <Input type="number" v-bind="{ ...$attrs, ...componentField, ...config?.inputProps }" />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
