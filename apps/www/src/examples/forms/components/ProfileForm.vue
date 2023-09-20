<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { cn } from '@/lib/utils'

import { Input } from '@/lib/registry/new-york/ui/input'
import { Label } from '@/lib/registry/new-york/ui/label'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { Textarea } from '@/lib/registry/new-york/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { Button } from '@/lib/registry/new-york/ui/button'

const verifiedEmails = ref(['m@example.com', 'm@google.com', 'm@support.com'])

const profileForm = ref({
  username: '',
  email: '',
  bio: 'I own a computer.',
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
})

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160, { message: 'Bio must not be longer than 160 characters.' }).min(4, { message: 'Bio must be at least 2 characters.' }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
const errors = ref<z.ZodFormattedError<ProfileFormValues> | null>(null)

async function handleSubmit() {
  const result = profileFormSchema.safeParse(profileForm.value)
  if (!result.success) {
    errors.value = result.error.format()
    return
  }
  errors.value = null
  console.log('Form submitted!')
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Profile
    </h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit.prevent="handleSubmit">
    <div class="grid gap-2">
      <Label for="username" :class="cn('text-sm', errors?.username && 'text-destructive')">
        Username
      </Label>
      <Input id="username" v-model="profileForm.username" placeholder="shadcn" />
      <span class="text-muted-foreground text-sm">
        This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
      </span>
      <div v-if="errors?.username" class="text-sm text-destructive">
        <span v-for="error in errors.username._errors" :key="error">{{ error }}</span>
      </div>
    </div>
    <div class="grid gap-2">
      <Label for="email" :class="cn('text-sm', errors?.email && 'text-destructive')">
        Email
      </Label>
      <Select id="email" v-model="profileForm.email">
        <SelectTrigger>
          <SelectValue placeholder="Select an email" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
              {{ email }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span class="text-muted-foreground text-sm">
        You can manage verified email addresses in your email settings.
      </span>
      <div v-if="errors?.email" class="text-sm text-destructive">
        <span v-for="error in errors.email._errors" :key="error">{{ error }}</span>
      </div>
    </div>
    <div class="grid gap-2">
      <Label for="bio" :class="cn('text-sm', errors?.bio && 'text-destructive')">
        Bio
      </Label>
      <Textarea id="bio" v-model="profileForm.bio" placeholder="Tell us about yourself." />
      <span class="text-muted-foreground text-sm">
        You can @mention other users and organizations to link to them.
      </span>
      <div v-if="errors?.bio" class="text-sm text-destructive">
        <span v-for="error in errors.bio._errors" :key="error">{{ error }}</span>
      </div>
    </div>
    <div class="grid gap-2">
      <Label for="urls" :class="cn('text-sm', errors?.urls && 'text-destructive')">
        URLs
      </Label>
      <Input v-for="(url, index) in profileForm.urls" id="urls" :key="index" v-model="url.value" />
      <div v-if="errors?.urls" class="text-sm text-destructive">
        <span v-for="error in errors.urls._errors" :key="error">{{ error }}</span>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        class="text-xs w-20 mt-2"
        @click="profileForm.urls?.push({ value: '' })"
      >
        Add URL
      </Button>
    </div>
    <div class="flex justify-start">
      <Button type="submit">
        Update profile
      </Button>
    </div>
  </form>
</template>
