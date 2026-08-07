<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'

import { z } from 'zod'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/registry/new-york-v4/ui/field'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/registry/new-york-v4/ui/native-select'

const formSchema = toTypedSchema(z.object({
  country: z.string().min(2, {
    message: 'Select a country.',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 rounded-md bg-neutral-900 p-4 w-full' }, h('code', { class: 'text-code-foreground' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ componentField, errors }" name="country">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="form-native-select-country">
            Country
          </FieldLabel>
          <NativeSelect
            id="form-native-select-country"
            v-bind="(componentField as any)"
            :aria-invalid="!!errors.length"
          >
            <NativeSelectOption value="">
              Select a country
            </NativeSelectOption>
            <NativeSelectOption value="us">
              United States
            </NativeSelectOption>
            <NativeSelectOption value="uk">
              United Kingdom
            </NativeSelectOption>
            <NativeSelectOption value="ca">
              Canada
            </NativeSelectOption>
          </NativeSelect>
          <FieldDescription>
            Select a country
          </FieldDescription>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <Field>
        <Button type="submit" class="w-full">
          Submit
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
