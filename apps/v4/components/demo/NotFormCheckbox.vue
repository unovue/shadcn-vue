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

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, 'Please select at least one notification type.')
    .refine(
      value => value.every(task => tasks.some(t => t.id === task)),
      {
        message: 'Invalid notification type selected.',
      },
    ),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    responses: true,
    tasks: [],
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
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Manage your notification preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-checkbox" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('responses')">
            <FieldSet :data-invalid="!field.isValid">
              <FieldLegend variant="label">
                Responses
              </FieldLegend>
              <FieldDescription>
                Get notified for requests that take time, like research or image
                generation.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                <Field orientation="horizontal" :data-invalid="!field.isValid">
                  <Checkbox
                    :id="field.path"
                    v-model="field.model"
                    :aria-invalid="!field.isValid"
                    @blur="field.events.onBlur"
                    @update:model-value="field.events.onChange"
                  />
                  <FieldLabel :for="field.path" class="font-normal">
                    Push notifications
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </FieldSet>
          </NotField>
          <FieldSeparator />
          <NotField v-slot="{ field }" :field="form.field('tasks')">
            <FieldSet :data-invalid="!field.isValid">
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
                  :data-invalid="!field.isValid"
                >
                  <Checkbox
                    :id="`${field.path}-${task.id}`"
                    :model-value="field.model?.includes(task.id)"
                    :aria-invalid="!field.isValid"
                    @blur="field.events.onBlur"
                    @update:model-value="(checked: boolean | 'indeterminate') => {
                      field.model = checked === true
                        ? [...(field.model ?? []), task.id]
                        : (field.model ?? []).filter((id: string) => id !== task.id)

                      field.events.onChange()
                    }"
                  />
                  <FieldLabel :for="`${field.path}-${task.id}`" class="font-normal">
                    {{ task.label }}
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </FieldSet>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-checkbox">
          Reset
        </Button>
        <Button type="submit" form="form-notform-checkbox">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
