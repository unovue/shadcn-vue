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
import { Textarea } from '@/registry/new-york-v4/ui/textarea'

const formSchema = z.object({
  about: z
    .string()
    .min(10, 'Please provide at least 10 characters.')
    .max(200, 'Please keep it under 200 characters.'),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    about: '',
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
      <CardTitle>Personalization</CardTitle>
      <CardDescription>
        Customize your experience by telling us more about yourself.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-textarea" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('about')">
            <Field :data-invalid="!field.isValid">
              <FieldLabel :for="field.path">
                More about you
              </FieldLabel>
              <Textarea
                :id="field.path"
                v-model="field.model"
                v-bind="field.events"
                placeholder="I'm a software engineer..."
                class="min-h-[120px]"
                :aria-invalid="!field.isValid"
              />
              <FieldDescription>
                Tell us more about yourself. This will be used to help us
                personalize your experience.
              </FieldDescription>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-textarea">
          Reset
        </Button>
        <Button type="submit" form="form-notform-textarea">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
