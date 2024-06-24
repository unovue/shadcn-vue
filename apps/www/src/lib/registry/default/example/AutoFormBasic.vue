<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import { toast } from '@/lib/registry/default/ui/toast'
import { AutoForm, AutoFormField } from '@/lib/registry/default/ui/auto-form'

enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = 'I don\'t like sports',
}

const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),

  favouriteNumber: z.coerce
    .number({
      invalid_type_error: 'Favourite number must be a number.',
    })
    .min(1, {
      message: 'Favourite number must be at least 1.',
    })
    .max(10, {
      message: 'Favourite number must be at most 10.',
    })
    .default(1)
    .optional(),

  acceptTerms: z
    .boolean()
    .refine(value => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),

  sendMeMails: z.boolean().optional(),

  birthday: z.coerce.date().optional(),

  color: z.enum(['red', 'green', 'blue']).optional(),

  // Another enum example
  marshmallows: z
    .enum(['not many', 'a few', 'a lot', 'too many']),

  // Native enum example
  sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),

  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    })
    .optional(),

  customParent: z.string().optional(),

  file: z.string().optional(),
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
      password: {
        label: 'Your secure password',
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
      favouriteNumber: {
        description: 'Your favourite number between 1 and 10.',
      },
      acceptTerms: {
        label: 'Accept terms and conditions.',
        inputProps: {
          required: true,
        },
      },

      birthday: {
        description: 'We need your birthday to send you a gift.',
      },

      sendMeMails: {
        component: 'switch',
      },

      bio: {
        component: 'textarea',
      },

      marshmallows: {
        label: 'How many marshmallows fit in your mouth?',
        component: 'radio',
      },

      file: {
        label: 'Text file',
        component: 'file',
      },
    }"
    @submit="onSubmit"
  >
    <template #acceptTerms="slotProps">
      <AutoFormField v-bind="slotProps" />
      <div class="!mt-2 text-sm">
        I agree to the <button class="text-primary underline">
          terms and conditions
        </button>.
      </div>
    </template>

    <template #customParent="slotProps">
      <div class="flex items-end space-x-2">
        <AutoFormField v-bind="slotProps" class="w-full" />
        <Button type="button">
          Check
        </Button>
      </div>
    </template>

    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
