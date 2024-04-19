<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { Config, ConfigItem, FieldProps } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'

defineOptions({
  inheritAttrs: false,
})

defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="name">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? name) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input type="number" v-bind="{ ...slotProps.componentField, ...config?.inputProps }" :disabled="disabled" />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
