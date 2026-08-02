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

const FormSchema = v.object({
  language: v.pipe(
    v.string(),
    v.minLength(1, 'Please select your spoken language.'),
    v.check(
      value => value !== 'auto',
      'Auto-detection is not allowed. Please select a specific language.',
    ),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    language: '',
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
  <Card class="w-full sm:max-w-lg">
    <CardHeader>
      <CardTitle>Language Preferences</CardTitle>
      <CardDescription>
        Select your preferred spoken language.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-select" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['language']">
            <Field
              orientation="responsive"
              :data-invalid="field.errors !== null"
            >
              <FieldContent>
                <FieldLabel for="form-formisch-select-language">
                  Spoken Language
                </FieldLabel>
                <FieldDescription>
                  For best results, select the language you speak.
                </FieldDescription>
                <FieldError
                  v-if="field.errors"
                  :errors="field.errors.map(message => ({ message }))"
                />
              </FieldContent>
              <Select v-model="field.input">
                <SelectTrigger
                  id="form-formisch-select-language"
                  :aria-invalid="field.errors !== null"
                  class="min-w-[120px]"
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
          </FormischField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-select">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
