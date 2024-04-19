<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { Config, ConfigItem, FieldProps } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Textarea } from '@/lib/registry/new-york/ui/textarea'

defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="name">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? name) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Textarea v-if="config?.component === 'textarea'" type="text" v-bind="{ ...slotProps.componentField, ...config?.inputProps }" />
          <Input v-else type="text" v-bind="{ ...slotProps.componentField, ...config?.inputProps }" />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
