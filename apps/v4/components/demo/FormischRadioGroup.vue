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

const FormSchema = v.object({
  plan: v.pipe(
    v.string(),
    v.minLength(1, 'You must select a subscription plan to continue.'),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    plan: '',
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
      <CardTitle>Subscription Plan</CardTitle>
      <CardDescription>
        See pricing and features for each plan.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-radiogroup" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['plan']">
            <FieldSet :data-invalid="field.errors !== null">
              <FieldLegend>Plan</FieldLegend>
              <FieldDescription>
                You can upgrade or downgrade your plan at any time.
              </FieldDescription>
              <RadioGroup
                v-model="field.input"
                :aria-invalid="field.errors !== null"
              >
                <FieldLabel
                  v-for="plan in plans"
                  :key="plan.id"
                  :for="`form-formisch-radiogroup-${plan.id}`"
                >
                  <Field
                    orientation="horizontal"
                    :data-invalid="field.errors !== null"
                  >
                    <FieldContent>
                      <FieldTitle>{{ plan.title }}</FieldTitle>
                      <FieldDescription>
                        {{ plan.description }}
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      :id="`form-formisch-radiogroup-${plan.id}`"
                      :value="plan.id"
                      :aria-invalid="field.errors !== null"
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
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-radiogroup">
          Save
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
