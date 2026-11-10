<script setup lang="ts">
import { Form, Field as NotField, useForm } from 'notform'
import { toast } from 'vue-sonner'
import { z } from 'zod'

import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/registry/new-york-v4/ui/field'
import { Input } from '@/registry/new-york-v4/ui/input'

const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .max(10, 'Username must be at most 10 characters.')
    .regex(
      /^\w+$/,
      'Username can only contain letters, numbers, and underscores.',
    ),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    username: '',
  },
  onSubmit(data) {
    toast('You submitted the following values:', {
      description: h('pre', { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' }, h('code', JSON.stringify(data, null, 2))),
      position: 'bottom-right',
      class: 'flex flex-col gap-2',
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      },
    })
  },
})
</script>

<template>
  <Card class="w-full sm:max-w-md">
    <CardHeader>
      <CardTitle>Profile Settings</CardTitle>
      <CardDescription>
        Update your profile information below.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-input" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('username')">
            <Field :data-invalid="!field.isValid">
              <FieldLabel :for="field.path">
                Username
              </FieldLabel>
              <Input
                :id="field.path"
                v-model="field.model"
                v-bind="field.events"
                placeholder="shadcn"
                autocomplete="username"
                :aria-invalid="!field.isValid"
              />
              <FieldDescription>
                This is your public display name. Must be between 3 and 10
                characters. Must only contain letters, numbers, and
                underscores.
              </FieldDescription>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-input">
          Reset
        </Button>
        <Button type="submit" form="form-notform-input">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
