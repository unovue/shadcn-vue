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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/registry/new-york-v4/ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/registry/new-york-v4/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york-v4/ui/select'
import { Switch } from '@/registry/new-york-v4/ui/switch'

const addons = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Advanced analytics and reporting',
  },
  {
    id: 'backup',
    title: 'Backup',
    description: 'Automated daily backups',
  },
  {
    id: 'support',
    title: 'Priority Support',
    description: '24/7 premium customer support',
  },
] as const

const FormSchema = v.object({
  plan: v.pipe(
    v.string(),
    v.minLength(1, 'Please select a subscription plan'),
    v.check(
      value => value === 'basic' || value === 'pro',
      'Invalid plan selection. Please choose Basic or Pro',
    ),
  ),
  billingPeriod: v.pipe(
    v.string(),
    v.minLength(1, 'Please select a billing period'),
  ),
  addons: v.pipe(
    v.array(v.string()),
    v.minLength(1, 'Please select at least one add-on'),
    v.maxLength(3, 'You can select up to 3 add-ons'),
    v.check(
      value => value.every(addon => addons.some(a => a.id === addon)),
      'You selected an invalid add-on',
    ),
  ),
  emailNotifications: v.boolean(),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    plan: 'basic',
    billingPeriod: '',
    addons: [],
    emailNotifications: false,
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
  <Card class="w-full max-w-sm">
    <CardHeader class="border-b">
      <CardTitle>You're almost there!</CardTitle>
      <CardDescription>
        Choose your subscription plan and billing period.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-complex" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['plan']">
            <FieldSet :data-invalid="field.errors !== null">
              <FieldLegend variant="label">
                Subscription Plan
              </FieldLegend>
              <FieldDescription>
                Choose your subscription plan.
              </FieldDescription>
              <RadioGroup
                v-model="field.input"
                :aria-invalid="field.errors !== null"
              >
                <FieldLabel for="form-formisch-complex-basic">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Basic</FieldTitle>
                      <FieldDescription>
                        For individuals and small teams
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      id="form-formisch-complex-basic"
                      value="basic"
                    />
                  </Field>
                </FieldLabel>
                <FieldLabel for="form-formisch-complex-pro">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pro</FieldTitle>
                      <FieldDescription>
                        For businesses with higher demands
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      id="form-formisch-complex-pro"
                      value="pro"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </FieldSet>
          </FormischField>
          <FieldSeparator />
          <FormischField v-slot="field" :of="form" :path="['billingPeriod']">
            <Field :data-invalid="field.errors !== null">
              <FieldLabel for="form-formisch-complex-billingPeriod">
                Billing Period
              </FieldLabel>
              <Select v-model="field.input">
                <SelectTrigger
                  id="form-formisch-complex-billingPeriod"
                  :aria-invalid="field.errors !== null"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">
                    Monthly
                  </SelectItem>
                  <SelectItem value="yearly">
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose how often you want to be billed.
              </FieldDescription>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </Field>
          </FormischField>
          <FieldSeparator />
          <FormischField v-slot="field" :of="form" :path="['addons']">
            <FieldSet>
              <FieldLegend>Add-ons</FieldLegend>
              <FieldDescription>
                Select additional features you'd like to include.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                <Field
                  v-for="addon in addons"
                  :key="addon.id"
                  orientation="horizontal"
                  :data-invalid="field.errors !== null"
                >
                  <Checkbox
                    :id="`form-formisch-complex-${addon.id}`"
                    :aria-invalid="field.errors !== null"
                    :model-value="(field.input ?? []).includes(addon.id)"
                    @update:model-value="(checked) => {
                      field.input = checked === true
                        ? [...(field.input ?? []), addon.id]
                        : (field.input ?? []).filter(value => value !== addon.id)
                    }"
                  />
                  <FieldContent>
                    <FieldLabel :for="`form-formisch-complex-${addon.id}`">
                      {{ addon.title }}
                    </FieldLabel>
                    <FieldDescription>
                      {{ addon.description }}
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </FieldSet>
          </FormischField>
          <FieldSeparator />
          <FormischField
            v-slot="field"
            :of="form"
            :path="['emailNotifications']"
          >
            <Field
              orientation="horizontal"
              :data-invalid="field.errors !== null"
            >
              <FieldContent>
                <FieldLabel for="form-formisch-complex-emailNotifications">
                  Email Notifications
                </FieldLabel>
                <FieldDescription>
                  Receive email updates about your subscription
                </FieldDescription>
              </FieldContent>
              <Switch
                id="form-formisch-complex-emailNotifications"
                v-model="field.input"
                :aria-invalid="field.errors !== null"
              />
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </Field>
          </FormischField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter class="border-t">
      <Field>
        <Button type="submit" form="form-formisch-complex">
          Save Preferences
        </Button>
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
