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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/registry/new-york-v4/ui/field'
import { Switch } from '@/registry/new-york-v4/ui/switch'

const formSchema = z.object({
  twoFactor: z.boolean().refine(value => value === true, {
    message: 'It is highly recommended to enable two-factor authentication.',
  }),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    twoFactor: false,
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
      <CardTitle>Security Settings</CardTitle>
      <CardDescription>
        Manage your account security preferences.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-switch" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('twoFactor')">
            <Field orientation="horizontal" :data-invalid="!field.isValid">
              <FieldContent>
                <FieldLabel :for="field.path">
                  Multi-factor authentication
                </FieldLabel>
                <FieldDescription>
                  Enable multi-factor authentication to secure your account.
                </FieldDescription>
                <FieldError v-if="!field.isValid" :errors="field.errors" />
              </FieldContent>
              <Switch
                :id="field.path"
                v-model="field.model"
                :aria-invalid="!field.isValid"
                @blur="field.events.onBlur"
                @update:model-value="field.events.onChange"
              />
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-switch">
          Reset
        </Button>
        <Button type="submit" form="form-notform-switch">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
