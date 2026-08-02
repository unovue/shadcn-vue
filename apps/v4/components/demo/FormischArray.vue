<script setup lang="ts">
import type { SubmitHandler } from '@formisch/vue'
import {
  FieldArray,
  Form,
  Field as FormischField,
  insert,
  remove,
  reset,
  useForm,
} from '@formisch/vue'
import { XIcon } from '@lucide/vue'
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
  FieldLegend,
  FieldSet,
} from '@/registry/new-york-v4/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'

const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty('Enter an email address.'),
          v.email('Enter a valid email address.'),
        ),
      }),
    ),
    v.minLength(1, 'Add at least one email address.'),
    v.maxLength(5, 'You can add up to 5 email addresses.'),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    emails: [{ address: '' }, { address: '' }],
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
    <CardHeader class="border-b">
      <CardTitle>Contact Emails</CardTitle>
      <CardDescription>Manage your contact email addresses.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-array" :of="form" @submit="handleSubmit">
        <FieldArray v-slot="fieldArray" :of="form" :path="['emails']">
          <FieldSet class="gap-4">
            <FieldLegend variant="label">
              Email Addresses
            </FieldLegend>
            <FieldDescription>
              Add up to 5 email addresses where we can contact you.
            </FieldDescription>
            <FieldGroup class="gap-4">
              <FormischField
                v-for="(item, index) in fieldArray.items"
                :key="item"
                v-slot="field"
                :of="form"
                :path="['emails', index, 'address']"
              >
                <Field
                  orientation="horizontal"
                  :data-invalid="field.errors !== null"
                >
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        :id="`form-formisch-array-email-${index}`"
                        v-model="field.input"
                        v-bind="field.props"
                        :aria-invalid="field.errors !== null"
                        placeholder="name@example.com"
                        type="email"
                        autocomplete="email"
                      />
                      <InputGroupAddon
                        v-if="fieldArray.items.length > 1"
                        align="inline-end"
                      >
                        <InputGroupButton
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          :aria-label="`Remove email ${index + 1}`"
                          @click="remove(form, { path: ['emails'], at: index })"
                        >
                          <XIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError
                      v-if="field.errors"
                      :errors="field.errors.map(message => ({ message }))"
                    />
                  </FieldContent>
                </Field>
              </FormischField>
              <Button
                type="button"
                variant="outline"
                size="sm"
                :disabled="fieldArray.items.length >= 5"
                @click="insert(form, { path: ['emails'], initialInput: { address: '' } })"
              >
                Add Email Address
              </Button>
            </FieldGroup>
            <FieldError
              v-if="fieldArray.errors"
              :errors="fieldArray.errors.map(message => ({ message }))"
            />
          </FieldSet>
        </FieldArray>
      </Form>
    </CardContent>
    <CardFooter class="border-t">
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-array">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
