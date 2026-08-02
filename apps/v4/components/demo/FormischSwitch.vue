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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/registry/new-york-v4/ui/field'
import { Switch } from '@/registry/new-york-v4/ui/switch'

const FormSchema = v.object({
  twoFactor: v.pipe(
    v.boolean(),
    v.check(
      value => value === true,
      'It is highly recommended to enable two-factor authentication.',
    ),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    twoFactor: false,
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
      <CardTitle>Security Settings</CardTitle>
      <CardDescription>
        Manage your account security preferences.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-switch" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['twoFactor']">
            <Field
              orientation="horizontal"
              :data-invalid="field.errors !== null"
            >
              <FieldContent>
                <FieldLabel for="form-formisch-switch-twoFactor">
                  Multi-factor authentication
                </FieldLabel>
                <FieldDescription>
                  Enable multi-factor authentication to secure your account.
                </FieldDescription>
                <FieldError
                  v-if="field.errors"
                  :errors="field.errors.map(message => ({ message }))"
                />
              </FieldContent>
              <Switch
                id="form-formisch-switch-twoFactor"
                v-model="field.input"
                :aria-invalid="field.errors !== null"
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
        <Button type="submit" form="form-formisch-switch">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
