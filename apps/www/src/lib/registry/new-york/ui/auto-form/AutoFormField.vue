<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from 'zod'
import { computed } from 'vue'
import type { Config, ConfigItem, Shape } from './interface'
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant'

const props = defineProps<{
  name: string
  shape: Shape
  label?: string
  config?: ConfigItem | Config<U>
}>()

function isValidConfig(config: any): config is ConfigItem {
  return !!config?.component
}

const delegatedProps = computed(() => {
  if (['ZodObject', 'ZodArray'].includes(props.shape?.type))
    return { schema: props.shape?.schema }
  return undefined
})
</script>

<template>
  <component
    :is="isValidConfig(config) ? INPUT_COMPONENTS[config.component!] : INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[shape.type]] "
    :name="name"
    :label="label"
    :required="shape.required"
    :options="shape.options"
    :config="config"
    v-bind="delegatedProps"
  >
    <slot />
  </component>
</template>
