<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import { toast } from '@/lib/registry/new-york/ui/toast'
import { AutoForm, AutoFormField } from '@/lib/registry/new-york/ui/auto-form'

const schema = z.object({
  subObject: z.object({
    subField: z.string().optional().default('Sub Field'),
    numberField: z.number().optional().default(1),

    subSubObject: z
      .object({
        subSubField: z.string().default('Sub Sub Field'),
      })
      .describe('Sub Sub Object Description'),
  }),
  optionalSubObject: z
    .object({
      optionalSubField: z.string(),
      otherOptionalSubField: z.string(),
    })
    .optional(),
})

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      subObject: {
        numberField: {
          inputProps: {
            type: 'number',
          },
        },
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
