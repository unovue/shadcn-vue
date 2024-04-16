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

  <!-- <FieldInput
    v-if="shape.type === ZodFirstPartyTypeKind.ZodString"
    :name="name"
    :required="shape.required"
    :config="config"
  />
  <FieldInput
    v-else-if="shape.type === ZodFirstPartyTypeKind.ZodNumber"
    :name="name"
    :required="shape.required"
    type="number"
    :config="config"
  />
  <FieldBoolean
    v-else-if="shape.type === ZodFirstPartyTypeKind.ZodBoolean"
    :name="name"
    :required="shape.required"
    :config="config"
  />
  <FieldDate
    v-else-if="shape.type === ZodFirstPartyTypeKind.ZodDate"
    :name="name"
    :required="shape.required"
    :config="config"
  />
  <FieldEnum
    v-else-if="shape.type === ZodFirstPartyTypeKind.ZodEnum"
    :name="name"
    :required="shape.required"
    :config="config"
    :options="shape.options"
  /> -->
</template>
