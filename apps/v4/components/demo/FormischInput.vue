<script setup lang="ts">
import type { SubmitHandler } from '@formisch/vue'
import { Form, Field as FormischField, reset, useForm } from '@formisch/vue'
import * as v from 'valibot'
import { toast } from 'vue-sonner'

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

const FormSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(3, 'Username must be at least 3 characters.'),
    v.maxLength(10, 'Username must be at most 10 characters.'),
    v.regex(
      /^\w+$/,
      'Username can only contain letters, numbers, and underscores.',
    ),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    username: '',
  },
})

const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' }, h('code', JSON.stringify(output, null, 2))),
    position: 'bottom-right',
    class: 'flex flex-col gap-2',
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  })
}
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
      <Form id="form-formisch-input" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['username']">
            <Field :data-invalid="field.errors !== null">
              <FieldLabel for="form-formisch-input-username">
                Username
              </FieldLabel>
              <Input
                id="form-formisch-input-username"
                v-model="field.input"
                v-bind="field.props"
                :aria-invalid="field.errors !== null"
                placeholder="shadcn"
                autocomplete="username"
              />
              <FieldDescription>
                This is your public display name. Must be between 3 and 10
                characters. Must only contain letters, numbers, and
                underscores.
              </FieldDescription>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </Field>
          </FormischField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-input">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
