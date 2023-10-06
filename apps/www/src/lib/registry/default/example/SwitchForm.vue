<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/lib/registry/default/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/lib/registry/default/ui/form'
import { Switch } from '@/lib/registry/default/ui/switch'

const formSchema = toTypedSchema(z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    security_emails: true,
  },
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form class="w-full space-y-6" @submit="onSubmit">
    <div>
      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>

      <div class="space-y-4">
        <FormField v-slot="{ value, handleChange }" name="marketing_emails">
          <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                Marketing emails
              </FormLabel>
              <FormDescription>
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" name="security_emails">
          <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                Security emails
              </FormLabel>
              <FormDescription>
                Receive emails about your account security.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                disabled
                aria-readonly
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </div>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
