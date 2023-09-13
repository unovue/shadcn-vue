<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { cn } from '@/lib/utils'

import { Label } from '@/lib/registry/new-york/ui/label'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/lib/registry/new-york/ui/radio-group'
import { Switch } from '@/lib/registry/new-york/ui/switch'
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'
import { Button } from '@/lib/registry/new-york/ui/button'

const notificationsForm = ref({
  type: '',
  mobile: false,
  communication_emails: false,
  social_emails: true,
  marketing_emails: false,
  security_emails: true,
})

const notificationsFormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

type notificationsFormValues = z.infer<typeof notificationsFormSchema>
const errors = ref<z.ZodFormattedError<notificationsFormValues> | null>(null)

async function handleSubmit() {
  const result = notificationsFormSchema.safeParse(notificationsForm.value)
  if (!result.success) {
    errors.value = result.error.format()
    console.log(errors.value)
    return
  }

  console.log('Form submitted!', notificationsForm.value)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Notifications
    </h3>
    <p class="text-sm text-muted-foreground">
      Configure how you receive notifications.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit.prevent="handleSubmit">
    <div class="grid gap-2">
      <Label for="font" :class="cn('text-sm', errors?.type && 'text-destructive')">
        Notify me about...
      </Label>
      <RadioGroup
        v-model="notificationsForm.type"
        default-value="all"
        class="flex flex-col space-y-1"
      >
        <div class="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="all" value="all" />
          <Label for="all">All new messages</Label>
        </div>
        <div class="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="mentions" value="mentions" />
          <Label for="mentions">Direct messages and mentions</Label>
        </div>
        <div class="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="none" value="none" />
          <Label for="none">Nothing</Label>
        </div>
        <div v-if="errors?.type" class="text-sm text-destructive">
          <span v-for="error in errors.type._errors" :key="error">{{ error }}</span>
        </div>
      </RadioGroup>
    </div>

    <div class="grid gap-2">
      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>
      <div class="space-y-4">
        <div class="flex flex-row items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <Label class="text-base" for="communication_emails">
              Communication emails
            </Label>
            <span class="text-xs text-muted-foreground">
              Receive emails about your account activity.
            </span>
          </div>
          <Switch
            id="communication_emails"
            v-model:checked="notificationsForm.communication_emails"
          />
        </div>
      </div>
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <Label class="text-base" for="marketing_emails">
            Marketing emails
          </Label>
          <span class="text-xs text-muted-foreground">
            Receive emails about new products, features, and more.
          </span>
        </div>
        <Switch
          id="marketing_emails"
          v-model:checked="notificationsForm.marketing_emails"
        />
      </div>
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <Label class="text-base" for="social_emails">
            Social emails
          </Label>
          <span class="text-xs text-muted-foreground">
            Receive emails for friend requests, follows, and more.
          </span>
        </div>
        <Switch
          id="social_emails"
          v-model:checked="notificationsForm.social_emails"
        />
      </div>

      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <Label class="text-base" for="security_emails">
            Security emails
          </Label>
          <span class="text-xs text-muted-foreground">
            Receive emails about your account activity and security.
          </span>
        </div>
        <Switch
          id="security_emails"
          v-model:checked="notificationsForm.security_emails"
          disabled
        />
      </div>
    </div>

    <div class="grid gap-2">
      <div class="flex flex-row items-start space-x-3 space-y-0">
        <Checkbox
          id="mobile"
          v-model:checked="notificationsForm.mobile"
        />
        <div>
          <Label for="mobile">
            Use different settings for my mobile devices
          </Label>
          <span class="text-xs text-muted-foreground">
            You can manage your mobile notifications in the {{ " " }}
            <a href="/examples/forms">mobile settings</a> page.
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-start">
      <Button type="submit">
        Update notifications
      </Button>
    </div>
  </form>
</template>
