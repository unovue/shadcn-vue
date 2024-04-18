<script setup lang="ts">
import * as z from 'zod'
import { h, reactive } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/lib/registry/new-york/ui/button'
import { toast } from '@/lib/registry/new-york/ui/toast'
import type { Config } from '@/lib/registry/new-york/ui/auto-form'
import { AutoForm, AutoFormField } from '@/lib/registry/new-york/ui/auto-form'

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
    .describe('Your secure password')
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
    .describe('Accept terms and conditions.')
    .refine(value => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),

  sendMeMails: z.boolean().optional(),

  birthday: z.coerce.date().optional(),

  color: z.enum(['red', 'green', 'blue']).optional(),

  // Another enum example
  marshmallows: z
    .enum(['not many', 'a few', 'a lot', 'too many'])
    .describe('How many marshmallows fit in your mouth?'),

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

  file: z.string().optional().describe('Text file'),

  subObject: z.object({
    subField: z.string().optional().default('Sub Field'),
    numberField: z.number().optional().default(1),

    subSubObject: z
      .object({
        subSubField: z.string().default('Sub Sub Field'),
      }),
  }).describe('123 Description'),

  optionalSubObject: z
    .object({
      optionalSubField: z.string(),
      otherOptionalSubField: z.string(),
    })
    .optional(),

})

const formSchema = toTypedSchema(schema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})

const config
  = reactive({
    username: {
      label: '123',
      description: 'Test description',
      inputProps: {
        id: '123',
      },
    },
    password: {
      inputProps: {
        id: '345',
        type: 'password',
      },
    },
    acceptTerms: {
      description: 'this is custom',
    },
    sendMeMails: {
      component: 'switch',
    },
    color: {
      enumProps: {
        options: ['red', 'green', 'blue'],
        placeholder: 'Choose a color',
      },
    },
    marshmallows: {
      component: 'radio',
    },
    bio: {
      component: 'textarea',
    },
    file: {
      component: 'file',
    },

    subObject: {
      subField: {
        label: 'custom labvel',
        description: '123',
      },
      subSubObject: {
        subSubField: {
          label: 'sub suuuub',
        },
      },
    },
  }) as Config<z.infer<typeof schema>>
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="config"
    @submit="onSubmit"
  >
    <template #username="componentField">
      <div class="border p-4 rounded-lg shadow-sm">
        <AutoFormField v-bind="{ ...componentField, name: 'username' }" />
      </div>
    </template>
    <template #customParent="componentField">
      <div class="flex items-end space-x-4">
        <AutoFormField class="w-full" v-bind="{ ...componentField, name: 'customParent' }" />
        <Button>Check</Button>
      </div>
    </template>

    <template #subObject="componentField">
      <AutoFormField v-bind="{ ...componentField, name: 'subObject' }" />
    </template>

    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
