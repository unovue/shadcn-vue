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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'

const spokenLanguages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
] as const

const formSchema = z.object({
  language: z
    .string()
    .min(1, 'Please select your spoken language.')
    .refine(value => value !== 'auto', {
      message:
          'Auto-detection is not allowed. Please select a specific language.',
    }),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    language: '',
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
  <Card class="w-full sm:max-w-lg">
    <CardHeader>
      <CardTitle>Language Preferences</CardTitle>
      <CardDescription>
        Select your preferred spoken language.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-select" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('language')">
            <Field
              orientation="responsive"
              :data-invalid="!field.isValid"
            >
              <FieldContent>
                <FieldLabel :for="field.path">
                  Spoken Language
                </FieldLabel>
                <FieldDescription>
                  For best results, select the language you speak.
                </FieldDescription>
                <FieldError v-if="!field.isValid" :errors="field.errors" />
              </FieldContent>
              <Select
                v-model="field.model"
                @update:model-value="field.events.onChange"
              >
                <SelectTrigger
                  :id="field.path"
                  class="min-w-[120px]"
                  :aria-invalid="!field.isValid"
                  @blur="field.events.onBlur"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value="auto">
                    Auto
                  </SelectItem>
                  <SelectSeparator />
                  <SelectItem
                    v-for="language in spokenLanguages"
                    :key="language.value"
                    :value="language.value"
                  >
                    {{ language.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-select">
          Reset
        </Button>
        <Button type="submit" form="form-notform-select">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
