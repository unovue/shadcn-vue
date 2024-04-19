<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from 'zod'
import type { Config, ConfigItem, Shape } from './interface'
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant'

defineProps<{
  name: string
  shape: Shape
  label?: string
  config?: ConfigItem | Config<U>
}>()

function isValidConfig(config: any): config is ConfigItem {
  return !!config?.component
}
</script>

<template>
  <component
    :is="isValidConfig(config) ? INPUT_COMPONENTS[config.component!] : INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[shape.type]] "
    :name="name"
    :label="label"
    :required="shape.required"
    :options="shape.options"
    :schema="shape.schema"
    :config="config"
  >
    <slot />
  </component>
</template>
