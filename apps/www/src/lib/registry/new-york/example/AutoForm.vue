<script setup lang="ts">
import * as z from 'zod'
import { h, reactive, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { DependencyType } from '../ui/auto-form/interface'
import { Button } from '@/lib/registry/new-york/ui/button'
import { toast } from '@/lib/registry/new-york/ui/toast'
import type { Config } from '@/lib/registry/new-york/ui/auto-form'
import { AutoForm, AutoFormField } from '@/lib/registry/new-york/ui/auto-form'

const schema = z.object({
  age: z.number().default(20),
  parentsAllowed: z.boolean().optional(),
  vegetarian: z.boolean().default(true),
  mealOptions: z.enum(['Pasta', 'Salad', 'Beef Wellington']).optional(),
  invitedGuests: z
    .array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    ).default([{ name: '123', age: 0 }]),

  subObject: z.object({
    subField: z.string().optional().default('Sub Field'),
    numberField: z.number().optional().default(10),

    subSubObject: z
      .object({
        subSubField: z.string().default('Sub Sub Field'),
      })
      .describe('Sub Sub Object Description'),
  }),
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
      age: {
        description:
          'Setting this below 18 will require parents consent.',
      },
      parentsAllowed: {
        label: 'Did your parents allow you to register?',
      },
      vegetarian: {
        label: 'Are you a vegetarian?',
        description:
          'Setting this to true will remove non-vegetarian food options.',
      },
      mealOptions: {
        component: 'radio',
      },
    }"
    :dependencies="[
      {
        // 'age' hides 'parentsAllowed' when the age is 18 or older
        sourceField: 'age',
        type: DependencyType.HIDES,
        targetField: 'parentsAllowed',
        when: (age) => age >= 18,
      },
      {
        // 'vegetarian' checkbox hides the 'Beef Wellington' option from 'mealOptions'
        // if its not already selected
        sourceField: 'vegetarian',
        type: DependencyType.SETS_OPTIONS,
        targetField: 'mealOptions',
        when: (vegetarian, mealOption) =>
          vegetarian && mealOption !== 'Beef Wellington',
        options: ['Pasta', 'Salad'],
      },
      {
        sourceField: 'age',
        type: DependencyType.HIDES,
        targetField: 'invitedGuests.age' as any,
        when: (age) => age >= 18,
      },
      {
        sourceField: 'age' as any,
        type: DependencyType.HIDES,
        targetField: 'subObject.subSubObject' as any,
        when: (age) => age >= 18,
      },
    ]"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
