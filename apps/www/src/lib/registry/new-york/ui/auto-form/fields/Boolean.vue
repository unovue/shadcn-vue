<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { ConfigItem } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Switch } from '@/lib/registry/new-york/ui/switch'
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'

defineProps<{
  name: string
  required?: boolean
  config?: ConfigItem
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <div class="space-y-0 mb-3 flex items-center gap-3">
        <FormControl>
          <Switch v-if="config?.component === 'switch'" v-bind="{ ...componentField }" />
          <Checkbox v-else v-bind="{ ...componentField }" />
        </FormControl>
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.label || beautifyObjectName(name) }}
        </AutoFormLabel>
      </div>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
