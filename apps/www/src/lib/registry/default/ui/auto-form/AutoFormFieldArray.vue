<script setup lang="ts" generic="T extends z.ZodAny">
import * as z from 'zod'
import { computed, provide } from 'vue'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import { FieldArray, FieldContextKey, useField, useFieldArray } from 'vee-validate'
import type { Config, ConfigItem } from './interface'
import { beautifyObjectName, getBaseType } from './utils'
import AutoFormField from './AutoFormField.vue'
import AutoFormLabel from './AutoFormLabel.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'
import { Button } from '@/lib/registry/default/ui/button'
import { Separator } from '@/lib/registry/default/ui/separator'
import { FormMessage } from '@/lib/registry/default/ui/form'

const props = defineProps<{
  fieldName: string
  required?: boolean
  config?: Config<T>
  schema?: z.ZodArray<T>
  disabled?: boolean
}>()

const fieldContext = useField(props.fieldName)

function isZodArray(
  item: z.ZodArray<any> | z.ZodDefault<any>,
): item is z.ZodArray<any> {
  return item instanceof z.ZodArray
}

function isZodDefault(
  item: z.ZodArray<any> | z.ZodDefault<any>,
): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault
}

const itemShape = computed(() => {
  if (!props.schema)
    return

  const schema: z.ZodAny = isZodArray(props.schema)
    ? props.schema._def.type
    : isZodDefault(props.schema)
    // @ts-expect-error missing schema
      ? props.schema._def.innerType._def.type
      : null

  return {
    type: getBaseType(schema),
    schema,
  }
})

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext)
</script>

<template>
  <FieldArray v-slot="{ fields, remove, push }" as="section" :name="fieldName">
    <slot v-bind="props">
      <Accordion type="multiple" class="w-full" collapsible :disabled="disabled">
        <AccordionItem :value="fieldName" class="border-none">
          <AccordionTrigger>
            <AutoFormLabel class="text-base" :required="required">
              {{ schema?.description || beautifyObjectName(fieldName) }}
            </AutoFormLabel>
          </AccordionTrigger>

          <AccordionContent>
            <template v-for="(field, index) of fields" :key="field.key">
              <div class="mb-4 p-[1px]">
                <AutoFormField
                  :field-name="`${fieldName}[${index}]`"
                  :label="fieldName"
                  :shape="itemShape!"
                  :config="config as ConfigItem"
                />

                <div class="!my-4 flex justify-end">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    @click="remove(index)"
                  >
                    <TrashIcon :size="16" />
                  </Button>
                </div>
                <Separator v-if="!field.isLast" />
              </div>
            </template>

            <Button
              type="button"
              variant="secondary"
              class="mt-4 flex items-center"
              @click="push(null)"
            >
              <PlusIcon class="mr-2" :size="16" />
              Add
            </Button>
          </AccordionContent>

          <FormMessage />
        </AccordionItem>
      </Accordion>
    </slot>
  </FieldArray>
</template>
