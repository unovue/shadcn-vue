<script setup lang="ts" generic="T extends ZodRawShape">
import type { ZodAny, ZodObject, ZodRawShape } from 'zod'
import { computed } from 'vue'
import type { Config, ConfigItem, Shape } from '../interface'
import { beautifyObjectName, getBaseSchema, getBaseType, getDefaultValueInZodStack } from '../utils'
import AutoFormField from '../AutoFormField.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'

const props = defineProps<{
  fieldName: string
  required?: boolean
  config?: Config<T>
  schema?: ZodObject<T>
  disabled?: boolean
}>()

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}

  if (!props.schema)
    return
  const shape = getBaseSchema(props.schema)?.shape
  if (!shape)
    return
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
  <section>
    <slot v-bind="props">
      <Accordion type="multiple" class="w-full" collapsible :disabled="disabled">
        <AccordionItem :value="fieldName" class="border-none">
          <AccordionTrigger class="text-base">
            {{ schema?.description || beautifyObjectName(fieldName) }}
          </AccordionTrigger>
          <AccordionContent class="p-[1px] space-y-5">
            <template v-for="(shape, key) in shapes" :key="key">
              <AutoFormField
                :config="config?.[key as keyof typeof config] as ConfigItem"
                :field-name="`${fieldName}.${key.toString()}`"
                :label="key.toString()"
                :shape="shape"
              />
            </template>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </slot>
  </section>
</template>
