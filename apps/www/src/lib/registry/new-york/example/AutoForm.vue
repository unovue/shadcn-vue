<script setup lang="ts">
import * as z from 'zod'
import { h, reactive, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/lib/registry/new-york/ui/button'
import { toast } from '@/lib/registry/new-york/ui/toast'
import type { Config } from '@/lib/registry/new-york/ui/auto-form'
import { AutoForm as AutoFormComponent, AutoFormField } from '@/lib/registry/new-york/ui/auto-form'

const schema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    ).default([
      { name: '123', age: 30 },
      { name: '456', age: 30 },
    ]).describe('How many guests'),

  list: z.array(z.string()).describe('test the config').min(1, 'Please add some item').default([]),
})

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}

const form = useForm({
  keepValuesOnUnmount: true, // make sure the array/object field doesn't destroy the linked field
  validationSchema: toTypedSchema(schema),
})

form.setValues({
  guestListName: 'testing 123',
})
</script>

<template>
  <AutoFormComponent
    class="w-2/3 space-y-6"
    :form="form"
    :schema="schema"
    :field-config="{
      guestListName: {
        label: 'Lisst',
        inputProps: {
          placeholder: 'testign123',
        },
      },
      invitedGuests: {
        name: {
          label: 'walaaaaao',
        },
      },
      list: {
        label: 'woohooo',
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoFormComponent>
</template>
