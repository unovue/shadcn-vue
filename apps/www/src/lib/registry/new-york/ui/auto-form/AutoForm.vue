<script setup lang="ts" generic="U extends ZodRawShape, T extends ZodObject<U>">
import { computed, ref } from 'vue'
import type { ZodAny, ZodObject, ZodRawShape, z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { FormContext, GenericObject } from 'vee-validate'
import { getBaseType, getDefaultValueInZodStack } from './utils'
import type { Config, ConfigItem, Shape } from './interface'
import AutoFormField from './AutoFormField.vue'
import { Form } from '@/lib/registry/new-york/ui/form'

const props = defineProps<{
  schema: T
  form?: FormContext<GenericObject>
  fieldConfig?: Config<z.infer<T>>
}>()

const emits = defineEmits<{
  submit: [event: GenericObject]
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

const formComponent = computed(() => props.form ? 'form' : Form)
const formComponentProps = computed(() => {
  const formSchema = toTypedSchema(props.schema)
  if (props.form) {
    return {
      onSubmit: props.form.handleSubmit(val => emits('submit', val)),
    }
  }
  else {
    return {
      keepValues: true,
      validationSchema: formSchema,
      onSubmit: (val: GenericObject) => emits('submit', val),
    }
  }
})
</script>

<template>
  <component
    :is="formComponent"
    v-bind="formComponentProps"
  >
    <template v-for="(shape, key) of shapes" :key="key">
      <slot
        :shape="shape"
        :name="key.toString() as keyof z.infer<T>"
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
  </component>
</template>
