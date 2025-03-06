<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/new-york-v4/ui/form'
import { Input } from '@/registry/new-york-v4/ui/input'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'
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
import { Textarea } from '@/registry/new-york-v4/ui/textarea'
import { fromDate, getLocalTimeZone } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
] as const

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
  mobile: z.boolean().default(false).optional(),
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    username: '',
    items: ['recents', 'home'],
  },
})

const onSubmit = handleSubmit((data: z.infer<typeof FormSchema>) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(data, null, 2))),
  })
})
</script>

<template>
  <form
    class="grid w-full max-w-sm gap-6"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Select
          :model-value="componentField.modelValue"
          @update:model-value="componentField['onUpdate:modelValue']"
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="m@example.com">
              m@example.com
            </SelectItem>
            <SelectItem value="m@google.com">
              m@google.com
            </SelectItem>
            <SelectItem value="m@support.com">
              m@support.com
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage email addresses in your email settings.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="bio"
    >
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="type"
    >
      <FormItem class="flex flex-col gap-3">
        <FormLabel>Notify me about...</FormLabel>
        <FormControl>
          <RadioGroup
            :model-value="componentField.modelValue"
            class="flex flex-col gap-3"
            @update:model-value="componentField['onUpdate:modelValue']"
          >
            <FormItem class="flex items-center gap-2">
              <FormControl>
                <RadioGroupItem value="all" />
              </FormControl>
              <FormLabel class="font-normal">
                All new messages
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center gap-2">
              <FormControl>
                <RadioGroupItem value="mentions" />
              </FormControl>
              <FormLabel class="font-normal">
                Direct messages and mentions
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center gap-2">
              <FormControl>
                <RadioGroupItem value="none" />
              </FormControl>
              <FormLabel class="font-normal">
                Nothing
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="mobile"
    >
      <FormItem class="flex flex-row items-start gap-3 rounded-md border p-4 shadow-xs">
        <FormControl>
          <Checkbox
            :model-value="componentField.modelValue"
            @update:model-value="componentField['onUpdate:modelValue']"
          />
        </FormControl>
        <div class="flex flex-col gap-1">
          <FormLabel class="leading-snug">
            Use different settings for my mobile devices
          </FormLabel>
          <FormDescription class="leading-snug">
            You can manage your mobile notifications in the mobile
            settings page.
          </FormDescription>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ field }" name="items">
      <FormItem class="flex flex-col gap-4">
        <div>
          <FormLabel class="text-base">
            Sidebar
          </FormLabel>
          <FormDescription>
            Select the items you want to display in the sidebar.
          </FormDescription>
        </div>
        <div class="flex flex-col gap-2">
          <FormField
            v-for="item in items"
            :key="item.id"
            name="items"
          >
            <FormItem
              :key="item.id"
              class="flex items-start gap-3"
            >
              <FormControl>
                <Checkbox
                  :model-value="field.value.includes(item.id)"
                  @update:model-value="(checked) => {
                    checked
                      ? field.onChange([...field.value, item.id])
                      : field.onChange(
                        field.value?.filter(
                          (value: any) => value !== item.id,
                        ),
                      )
                  }"
                />
              </FormControl>
              <FormLabel class="text-sm leading-tight font-normal">
                {{ item.label }}
              </FormLabel>
            </FormItem>
          </FormField>
        </div>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, setValue }"
      name="dob"
    >
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="cn(
                  'w-[240px] pl-3 text-left font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <span>
                  {{ value
                    ? format(value, "PPP")
                    : 'Pick a date'
                  }}
                </span>
                <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" align="start">
            <Calendar
              mode="single"
              :max-value="fromDate(new Date(), getLocalTimeZone())"
              initial-focus
              :model-value="value ? fromDate(value, getLocalTimeZone()) : undefined"
              @update:model-value="(val) => setValue(val?.toDate(getLocalTimeZone())) "
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div>
      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>
      <div class="flex flex-col gap-4">
        <FormField
          v-slot="{ componentField }"
          name="marketing_emails"
        >
          <FormItem class="flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs">
            <div class="flex flex-col gap-0.5">
              <FormLabel class="leading-normal">
                Marketing emails
              </FormLabel>
              <FormDescription class="leading-snug">
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="componentField.modelValue"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="security_emails"
        >
          <FormItem class="flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs">
            <div class="flex flex-col gap-0.5 opacity-60">
              <FormLabel class="leading-normal">
                Security emails
              </FormLabel>
              <FormDescription class="leading-snug">
                Receive emails about your account security.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="componentField.modelValue"
                disabled
                aria-readonly
                @update:model-value="componentField['onUpdate:modelValue']"
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
