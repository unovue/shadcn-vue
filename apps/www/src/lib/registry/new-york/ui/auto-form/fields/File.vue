<script setup lang="ts">
import { beautifyObjectName } from '../utils'
import type { ConfigItem } from '../interface'
import AutoFormLabel from '../AutoFormLabel.vue'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'

defineProps<{
  name: string
  required?: boolean
  config?: ConfigItem
}>()

async function parseFileAsString(file: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.onerror = (err) => {
        reject(err)
      }
      reader.readAsDataURL(file)
    }
  })
}
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem v-bind="$attrs">
      <AutoFormLabel :required="required">
        {{ config?.label || beautifyObjectName(name) }}
      </AutoFormLabel>
      <FormControl>
        <Input
          type="file"
          v-bind="{ ...config?.inputProps }"
          @change="async (ev: InputEvent) => {
            const file = (ev.target as HTMLInputElement).files?.[0]
            const parsed = await parseFileAsString(file)
            componentField.onInput(parsed)
          }"
        />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
