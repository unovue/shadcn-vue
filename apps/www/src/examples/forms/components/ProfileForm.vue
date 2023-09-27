<script setup lang="ts">
import { ref } from 'vue'
import { FieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Cross1Icon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

import { Input } from '@/lib/registry/new-york/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'
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

const profileFormSchema = toTypedSchema(z.object({
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
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    bio: 'I own a computer.',
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' },
    ],
  },
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  console.log(values)
})
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
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ field }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="field" />
        </FormControl>
        <FormDescription>
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
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
        </FormControl>
        <FormDescription>
          You can manage verified email addresses in your email settings.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about yourself" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="urls">
        <div v-for="(field, index) in fields" :key="`urls-${field.key}`">
          <FormField v-slot="{ componentField }" :name="`urls[${index}].value`">
            <FormItem>
              <FormLabel :class="cn(index !== 0 && 'sr-only')">
                URLs
              </FormLabel>
              <FormDescription :class="cn(index !== 0 && 'sr-only')">
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <div class="relative flex items-center">
                <FormControl>
                  <Input type="url" v-bind="componentField" />
                </FormControl>
                <button class="absolute py-2 pe-3 end-0 text-muted-foreground" @click="remove(index)">
                  <Cross1Icon class="w-3" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          class="text-xs w-20 mt-2"
          @click="push({ value: '' })"
        >
          Add URL
        </Button>
      </FieldArray>
    </div>

    <div class="flex gap-2 justify-start">
      <Button type="submit">
        Update profile
      </Button>

      <Button
        type="button"
        variant="outline"
        @click="resetForm"
      >
        Reset form
      </Button>
    </div>
  </form>
</template>
