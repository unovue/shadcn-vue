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
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/registry/new-york-v4/ui/field'

const tasks = [
  {
    id: 'push',
    label: 'Push notifications',
  },
  {
    id: 'email',
    label: 'Email notifications',
  },
] as const

const FormSchema = v.object({
  responses: v.boolean(),
  tasks: v.pipe(
    v.array(v.string()),
    v.minLength(1, 'Please select at least one notification type.'),
    v.check(
      value => value.every(task => tasks.some(t => t.id === task)),
      'Invalid notification type selected.',
    ),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    responses: true,
    tasks: [],
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
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Manage your notification preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-checkbox" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['responses']">
            <div>
              <FieldSet :data-invalid="field.errors !== null">
                <FieldLegend variant="label">
                  Responses
                </FieldLegend>
                <FieldDescription>
                  Get notified for requests that take time, like research or
                  image generation.
                </FieldDescription>
                <FieldGroup data-slot="checkbox-group">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="form-formisch-checkbox-responses"
                      :model-value="field.input ?? false"
                      disabled
                      @update:model-value="(checked) => field.input = checked === true"
                    />
                    <FieldLabel
                      for="form-formisch-checkbox-responses"
                      class="font-normal"
                    >
                      Push notifications
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </div>
          </FormischField>
          <FieldSeparator />
          <FormischField v-slot="field" :of="form" :path="['tasks']">
            <FieldGroup>
              <FieldSet :data-invalid="field.errors !== null">
                <FieldLegend variant="label">
                  Tasks
                </FieldLegend>
                <FieldDescription>
                  Get notified when tasks you've created have updates.
                </FieldDescription>
                <FieldGroup data-slot="checkbox-group">
                  <Field
                    v-for="task in tasks"
                    :key="task.id"
                    orientation="horizontal"
                    :data-invalid="field.errors !== null"
                  >
                    <Checkbox
                      :id="`form-formisch-checkbox-${task.id}`"
                      :aria-invalid="field.errors !== null"
                      :model-value="(field.input ?? []).includes(task.id)"
                      @update:model-value="(checked) => {
                        field.input = checked === true
                          ? [...(field.input ?? []), task.id]
                          : (field.input ?? []).filter(value => value !== task.id)
                      }"
                    />
                    <FieldLabel
                      :for="`form-formisch-checkbox-${task.id}`"
                      class="font-normal"
                    >
                      {{ task.label }}
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </FieldGroup>
          </FormischField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-checkbox">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
