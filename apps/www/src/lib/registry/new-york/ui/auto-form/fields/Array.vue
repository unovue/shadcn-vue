<script setup lang="ts" generic="T extends z.ZodAny">
import * as z from 'zod'
import { computed } from 'vue'
import { PlusIcon, TrashIcon } from '@radix-icons/vue'
import { useFieldArray } from 'vee-validate'
import type { Config, ConfigItem } from '../interface'
import { beautifyObjectName, getBaseType } from '../utils'
import AutoFormField from '../AutoFormField.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/new-york/ui/accordion'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Separator } from '@/lib/registry/new-york/ui/separator'

const props = defineProps<{
  name: string
  required?: boolean
  config?: Config<T>
  schema?: z.ZodArray<T>
}>()

const { remove, push, fields } = useFieldArray(props.name)

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
</script>

<template>
  <section>
    <slot v-bind="props">
      <Accordion type="multiple" class="w-full" collapsible>
        <AccordionItem :value="name" class="border-none">
          <AccordionTrigger class="text-base">
            {{ schema?.description || beautifyObjectName(name) }}
          </AccordionTrigger>
          {{ fields }}
          <AccordionContent class="p-2 space-y-5">
            <template v-for="(field, index) of fields" :key="field.key">
              <AutoFormField
                :name="`${name}[${index}]`"
                :label="name"
                :shape="itemShape!"
                :config="config as ConfigItem"
              />

              <div class="!mt-2 flex justify-end">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  @click="remove(index)"
                >
                  <TrashIcon />
                </Button>
              </div>
              <Separator />
            </template>

            <Button
              type="button"
              variant="secondary"
              class="mt-4 flex items-center"
              @click="push(null)"
            >
              <PlusIcon class="mr-2" />
              Add
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </slot>
  </section>
</template>
