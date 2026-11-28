<script setup lang="ts">
import { X } from '@lucide/vue'
import { ArrayField, Form, Field as NotField, useForm } from 'notform'
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
  FieldLegend,
  FieldSet,
} from '@/registry/new-york-v4/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email('Enter a valid email address.'),
      }),
    )
    .min(1, 'Add at least one email address.')
    .max(5, 'You can add up to 5 email addresses.'),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    emails: [{ address: '' }, { address: '' }],
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
    <CardHeader class="border-b">
      <CardTitle>Contact Emails</CardTitle>
      <CardDescription>Manage your contact email addresses.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-array" :form="form">
        <ArrayField v-slot="{ arrayField }" :array-field="form.arrayField('emails')">
          <FieldSet class="gap-4">
            <FieldLegend variant="label">
              Email Addresses
            </FieldLegend>
            <FieldDescription>
              Add up to 5 email addresses where we can contact you.
            </FieldDescription>
            <FieldGroup class="gap-4">
              <NotField
                v-for="item in arrayField.items"
                :key="item.id"
                v-slot="{ field }"
                :field="item.field('address')"
              >
                <Field
                  orientation="horizontal"
                  :data-invalid="!field.isValid"
                >
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        :id="field.path"
                        v-model="field.model"
                        v-bind="field.events"
                        type="email"
                        placeholder="name@example.com"
                        autocomplete="email"
                        :aria-invalid="!field.isValid"
                      />
                      <InputGroupAddon
                        v-if="arrayField.items.length > 1"
                        align="inline-end"
                      >
                        <InputGroupButton
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          :aria-label="`Remove email ${item.index + 1}`"
                          @click="arrayField.remove(item.index)"
                        >
                          <X />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError
                      v-if="!field.isValid"
                      :errors="field.errors"
                    />
                  </FieldContent>
                </Field>
              </NotField>
              <Button
                type="button"
                variant="outline"
                size="sm"
                :disabled="arrayField.items.length >= 5"
                @click="arrayField.append({ address: '' })"
              >
                Add Email Address
              </Button>
            </FieldGroup>
            <FieldError
              v-if="!arrayField.isValid"
              :errors="arrayField.errors"
            />
          </FieldSet>
        </ArrayField>
      </Form>
    </CardContent>
    <CardFooter class="border-t">
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-array">
          Reset
        </Button>
        <Button type="submit" form="form-notform-array">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
