<script setup lang="ts" generic="T extends ZodRawShape">
import type { ZodAny, ZodObject, ZodRawShape } from 'zod'
import { computed } from 'vue'
import type { Config, ConfigItem } from '../interface'
import { beautifyObjectName, getBaseSchema, getBaseType, getDefaultValueInZodStack } from '../utils'
import AutoFormField from '../AutoFormField.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/new-york/ui/accordion'

const props = defineProps<{
  name: string
  required?: boolean
  config?: Config<T>
  schema?: ZodObject<T>
}>()

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: {
    [key in keyof T]: {
      type: string
      default: any
      required?: boolean
      options?: string[]
      schema?: ZodAny
    }
  } = {}

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
      <Accordion type="multiple" class="w-full" collapsible>
        <AccordionItem :value="name" class="border-none">
          <AccordionTrigger class="text-base">
            {{ schema?.description || beautifyObjectName(name) }}
          </AccordionTrigger>
          <AccordionContent class="p-2 space-y-5">
            <template v-for="(shape, key) in shapes" :key="key">
              <AutoFormField
                :config="config?.[key as keyof typeof config] as ConfigItem"
                :name="key.toString()"
                :shape="shape"
              />
            </template>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </slot>
  </section>
</template>
