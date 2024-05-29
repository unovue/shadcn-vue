<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon } from 'lucide-vue-next'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName } from './utils'
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/lib/registry/default/ui/form'
import { Input } from '@/lib/registry/default/ui/input'
import { Button } from '@/lib/registry/default/ui/button'

defineProps<FieldProps>()

const inputFile = ref<File>()
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
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input
            v-if="!inputFile"
            type="file"
            v-bind="{ ...config?.inputProps }"
            :disabled="disabled"
            @change="async (ev: InputEvent) => {
              const file = (ev.target as HTMLInputElement).files?.[0]
              inputFile = file
              const parsed = await parseFileAsString(file)
              slotProps.componentField.onInput(parsed)
            }"
          />
          <div v-else class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent pl-3 pr-1 py-1 text-sm shadow-sm transition-colors">
            <p>{{ inputFile?.name }}</p>
            <Button
              :size="'icon'"
              :variant="'ghost'"
              class="size-[26px]"
              aria-label="Remove file"
              type="button"
              @click="() => {
                inputFile = undefined
                slotProps.componentField.onInput(undefined)
              }"
            >
              <TrashIcon :size="16" />
            </Button>
          </div>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
