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
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/registry/new-york-v4/ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/registry/new-york-v4/ui/radio-group'

const plans = [
  {
    id: 'starter',
    title: 'Starter (100K tokens/month)',
    description: 'For everyday use with basic features.',
  },
  {
    id: 'pro',
    title: 'Pro (1M tokens/month)',
    description: 'For advanced AI usage with more features.',
  },
  {
    id: 'enterprise',
    title: 'Enterprise (Unlimited tokens)',
    description: 'For large teams and heavy usage.',
  },
] as const

const formSchema = z.object({
  plan: z.string().min(1, 'You must select a subscription plan to continue.'),
})

const form = useForm({
  schema: formSchema,
  initialValues: {
    plan: '',
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
      <CardTitle>Subscription Plan</CardTitle>
      <CardDescription>
        See pricing and features for each plan.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-notform-radiogroup" :form="form">
        <FieldGroup>
          <NotField v-slot="{ field }" :field="form.field('plan')">
            <FieldSet :data-invalid="!field.isValid">
              <FieldLegend>Plan</FieldLegend>
              <FieldDescription>
                You can upgrade or downgrade your plan at any time.
              </FieldDescription>
              <RadioGroup
                v-model="field.model"
                :aria-invalid="!field.isValid"
                @blur="field.events.onBlur"
                @update:model-value="field.events.onChange"
              >
                <FieldLabel
                  v-for="planOption in plans"
                  :key="planOption.id"
                  :for="`${field.path}-${planOption.id}`"
                >
                  <Field orientation="horizontal" :data-invalid="!field.isValid">
                    <FieldContent>
                      <FieldTitle>{{ planOption.title }}</FieldTitle>
                      <FieldDescription>{{ planOption.description }}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      :id="`${field.path}-${planOption.id}`"
                      :value="planOption.id"
                      :aria-invalid="!field.isValid"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              <FieldError v-if="!field.isValid" :errors="field.errors" />
            </FieldSet>
          </NotField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" form="form-notform-radiogroup">
          Reset
        </Button>
        <Button type="submit" form="form-notform-radiogroup">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
