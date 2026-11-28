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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/registry/new-york-v4/ui/input-group'

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    title: '',
    description: '',
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
      <CardTitle>Bug Report</CardTitle>
      <CardDescription>
        Help us improve by reporting bugs you encounter.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-demo" :form="form">
        <FieldGroup>
          <NotField
            v-slot="{ field }"
            :field="form.field('title')"
          >
            <Field :data-invalid="!field.isValid">
              <FieldLabel :for="field.path">
                Bug Title
              </FieldLabel>
              <Input
                :id="field.path"
                v-model="field.model"
                v-bind="field.events"
                placeholder="Login button not working on mobile"
                autocomplete="off"
                :aria-invalid="!field.isValid"
              />
              <FieldError
                v-if="!field.isValid"
                :errors="field.errors"
              />
            </Field>
          </NotField>

          <NotField
            v-slot="{ field }"
            :field="form.field('description')"
          >
            <Field :data-invalid="!field.isValid">
              <FieldLabel :for="field.path">
                Description
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  :id="field.path"
                  v-model="field.model"
                  v-bind="field.events"
                  placeholder="I'm having an issue with the login button on mobile."
                  :rows="6"
                  class="min-h-24 resize-none"
                  :aria-invalid="!field.isValid"
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText class="tabular-nums">
                    {{ field.model?.length || 0 }}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <FieldDescription>
                Include steps to reproduce, expected behavior, and what actually
                happened.
              </FieldDescription>

              <FieldError
                v-if="!field.isValid"
                :errors="field.errors"
              />
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" form="form-notform-demo" variant="outline">
          Reset
        </Button>
        <Button type="submit" form="form-notform-demo">
          Submit
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
