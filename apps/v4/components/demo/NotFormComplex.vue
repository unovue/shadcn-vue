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

const formSchema = z.object({
  plan: z
    .string({
      required_error: 'Please select a subscription plan',
    })
    .min(1, 'Please select a subscription plan')
    .refine(value => value === 'basic' || value === 'pro', {
      message: 'Invalid plan selection. Please choose Basic or Pro',
    }),
  billingPeriod: z
    .string({
      required_error: 'Please select a billing period',
    })
    .min(1, 'Please select a billing period'),
  addons: z
    .array(z.string())
    .min(1, 'Please select at least one add-on')
    .max(3, 'You can select up to 3 add-ons')
    .refine(
      value => value.every(addon => addons.some(a => a.id === addon)),
      {
        message: 'You selected an invalid add-on',
      },
    ),
  emailNotifications: z.boolean(),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    plan: 'basic',
    billingPeriod: '',
    addons: [],
    emailNotifications: false,
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
  <Card class="w-full max-w-sm">
    <CardHeader class="border-b">
      <CardTitle>You're almost there!</CardTitle>
      <CardDescription>
        Choose your subscription plan and billing period.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-complex" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('plan')">
            <FieldSet :data-invalid="!field.isValid">
              <FieldLegend variant="label">
                Subscription Plan
              </FieldLegend>
              <FieldDescription>
                Choose your subscription plan.
              </FieldDescription>
              <RadioGroup
                v-model="field.model"
                :aria-invalid="!field.isValid"
                @blur="field.events.onBlur"
                @update:model-value="field.events.onChange"
              >
                <FieldLabel :for="`${field.path}-complex-basic`">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Basic</FieldTitle>
                      <FieldDescription>
                        For individuals and small teams
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      :id="`${field.path}-complex-basic`"
                      value="basic"
                    />
                  </Field>
                </FieldLabel>
                <FieldLabel :for="`${field.path}-complex-pro`">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pro</FieldTitle>
                      <FieldDescription>
                        For businesses with higher demands
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      :id="`${field.path}-complex-pro`"
                      value="pro"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </FieldSet>
          </NotField>
          <FieldSeparator />
          <NotField v-slot="{ field }" :field="form.field('billingPeriod')">
            <Field :data-invalid="!field.isValid">
              <FieldLabel :for="field.path">
                Billing Period
              </FieldLabel>
              <Select
                v-model="field.model"
                @update:model-value="field.events.onChange"
              >
                <SelectTrigger
                  :id="field.path"
                  :aria-invalid="!field.isValid"
                  @blur="field.events.onBlur"
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
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </Field>
          </NotField>
          <FieldSeparator />
          <NotField v-slot="{ field }" :field="form.field('addons')">
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
                  :data-invalid="!field.isValid"
                >
                  <Checkbox
                    :id="`${field.path}-${addon.id}`"
                    :aria-invalid="!field.isValid"
                    :model-value="field.model?.includes(addon.id)"
                    @blur="field.events.onBlur"
                    @update:model-value="(checked: boolean | 'indeterminate') => {
                      field.model = checked === true
                        ? [...(field.model ?? []), addon.id]
                        : (field.model ?? []).filter((id: string) => id !== addon.id)

                      field.events.onChange()
                    }"
                  />
                  <FieldContent>
                    <FieldLabel :for="`${field.path}-${addon.id}`">
                      {{ addon.title }}
                    </FieldLabel>
                    <FieldDescription>
                      {{ addon.description }}
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </FieldSet>
          </NotField>
          <FieldSeparator />
          <NotField
            v-slot="{ field }"
            :field="form.field('emailNotifications')"
          >
            <Field
              orientation="horizontal"
              :data-invalid="!field.isValid"
            >
              <FieldContent>
                <FieldLabel :for="field.path">
                  Email Notifications
                </FieldLabel>
                <FieldDescription>
                  Receive email updates about your subscription
                </FieldDescription>
              </FieldContent>
              <Switch
                :id="field.path"
                v-model="field.model"
                :aria-invalid="!field.isValid"
                @blur="field.events.onBlur"
                @update:model-value="field.events.onChange"
              />
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </Field>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter class="border-t">
      <Field>
        <Button type="submit" form="form-notform-complex">
          Save Preferences
        </Button>
        <Button type="reset" variant="outline" form="form-notform-complex">
          Reset
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
