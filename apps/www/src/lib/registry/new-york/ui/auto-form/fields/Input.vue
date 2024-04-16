<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { Config } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Textarea } from '@/lib/registry/new-york/ui/textarea'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  name: string
  required?: boolean
  config?: Config
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <AutoFormLabel :required="required">
        {{ config?.label || beautifyObjectName(name) }}
      </AutoFormLabel>
      <FormControl>
        <Textarea v-if="config?.component === 'textarea'" type="text" v-bind="{ ...$attrs, ...componentField, ...config?.inputProps }" />
        <Input v-else type="text" v-bind="{ ...$attrs, ...componentField, ...config?.inputProps }" />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
