<script setup lang="ts" generic="U extends ZodRawShape, T extends ZodObject<U>">
import { computed } from 'vue'
import type { ZodAny, ZodObject, ZodRawShape, z } from 'zod'
import { getBaseSchema, getBaseType, getDefaultValueInZodStack } from './utils'
import type { Config, ConfigItem, Shape } from './interface'
import AutoFormField from './AutoFormField.vue'

const props = defineProps<{
  schema: T
  fieldConfig?: Config<z.infer<T>>
}>()

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}
  const shape = props.schema.shape
  Object.keys(shape).forEach((name) => {
    const item = shape[name] as ZodAny
    let options = 'values' in item._def ? item._def.values as string[] : undefined
    if (!Array.isArray(options) && typeof options === 'object')
      options = Object.values(options)

    val[name as keyof T] = {
      type: getBaseType(item),
      default: getDefaultValueInZodStack(item),
      options,
      required: !['ZodOptional', 'ZodNullable'].includes(item._def.typeName),
      schema: item,
    }
  })
  return val
})
</script>

<template>
  <form>
    <template v-for="(shape, key) of shapes" :key="key">
      <slot
        :shape="shape"
        :name="key.toString()"
        :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
      >
        <AutoFormField
          :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
          :name="key.toString()"
          :shape="shape"
        />
      </slot>
    </template>

    <slot :shapes="shapes" />
  </form>
</template>
