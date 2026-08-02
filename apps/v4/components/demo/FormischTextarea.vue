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
import { Textarea } from '@/registry/new-york-v4/ui/textarea'

const FormSchema = v.object({
  about: v.pipe(
    v.string(),
    v.minLength(10, 'Please provide at least 10 characters.'),
    v.maxLength(200, 'Please keep it under 200 characters.'),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    about: '',
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
      <CardTitle>Personalization</CardTitle>
      <CardDescription>
        Customize your experience by telling us more about yourself.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-textarea" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['about']">
            <Field :data-invalid="field.errors !== null">
              <FieldLabel for="form-formisch-textarea-about">
                More about you
              </FieldLabel>
              <Textarea
                id="form-formisch-textarea-about"
                v-model="field.input"
                v-bind="field.props"
                :aria-invalid="field.errors !== null"
                placeholder="I'm a software engineer..."
                class="min-h-[120px]"
              />
              <FieldDescription>
                Tell us more about yourself. This will be used to help us
                personalize your experience.
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
        <Button type="submit" form="form-formisch-textarea">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
