<script setup lang="ts">
import type { ZodAny } from 'zod'

import type { Config } from './interface'
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant'

defineProps<{
  name: string
  shape: {
    type: string
    required?: boolean
    options?: any[]
    schema?: ZodAny
  }
  config?: Config
}>()
</script>

<template>
  <component
    :is="INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[shape.type]] "
    :name="name"
    :required="shape.required"
    :options="shape.options"
    :config="config"
  >
    <slot />
  </component>
</template>
