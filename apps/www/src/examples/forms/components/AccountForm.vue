<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { format } from 'date-fns'
import { toTypedSchema } from '@vee-validate/zod'
import { configure } from 'vee-validate'
import { cn } from '@/lib/utils'

import RadixIconsCalendar from '~icons/radix-icons/calendar'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Label } from '@/lib/registry/new-york/ui/label'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'

configure({
  bails: true,
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: true,
  validateOnModelUpdate: false,
})

const accountForm = ref({
  name: '',
  dob: null,
  language: '',
})

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

const accountFormSchema = toTypedSchema(z.object({
  // name: z
  //   .string()
  //   .min(2, {
  //     message: 'Name must be at least 2 characters.',
  //   })
  //   .max(30, {
  //     message: 'Name must not be longer than 30 characters.',
  //   }),
  // dob: z.date({
  //   required_error: 'A date of birth is required.',
  // }),
  // language: z.string().nonempty({
  //   message: 'Please select a language.',
  // }),
  example: z.string().nonempty({
    message: 'Please select a language.',
  }).min(5),
}))

// type AccountFormValues = z.infer<typeof accountFormSchema>
// const errors = ref<z.ZodFormattedError<AccountFormValues> | null>(null)

async function handleSubmit() {
  // const result = accountFormSchema.safeParse(accountForm.value)
  // if (!result.success) {
  //   errors.value = result.error.format()
  //   console.log(errors.value)
  //   return
  // }

  // console.log('Form submitted!', accountForm.value)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Account
    </h3>
    <p class="text-sm text-muted-foreground">
      Update your account settings. Set your preferred language and timezone.
    </p>
  </div>
  <Separator />
  <Form :validation-schema="accountFormSchema" class="space-y-8" @submit="handleSubmit">
    <FormField v-slot="{ field }" name="example" type="password">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Your name" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Label for="dob">
      Date of Birth
    </Label>

    <!-- <div class="grid gap-2">
      <Label for="name" :class="cn('text-sm', errors?.name && 'text-destructive')">
        Name
      </Label>
      <Input id="name" v-model="accountForm.name" placeholder="Your name" />
      <span class="text-muted-foreground text-sm">
        This is the name that will be displayed on your profile and in emails.
      </span>
      <div v-if="errors?.name" class="text-sm text-destructive">
        <span v-for="error in errors.name._errors" :key="error">{{ error }}</span>
      </div>
    </div> -->
    <!-- <div class="grid gap-2">

      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="cn(
              'w-[280px] pl-3 text-left font-normal',
              !accountForm.dob && 'text-muted-foreground',
            )"
          >
            <span>{{ accountForm.dob ? format(accountForm.dob, "PPP") : "Pick a date" }}</span>
            <RadixIconsCalendar class="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0">
          <Calendar v-model="accountForm.dob" />
        </PopoverContent>
      </Popover>
      <span class="text-muted-foreground text-sm">
        Your date of birth is used to calculate your age.
      </span>
      <div v-if="errors?.dob" class="text-sm text-destructive">
        <span v-for="error in errors.dob._errors" :key="error">{{ error }}</span>
      </div>
    </div>
    <div class="grid gap-2">
      <Label for="language" :class="cn('text-sm', errors?.language && 'text-destructive')">
        Language
      </Label>
      <Select id="language" v-model="accountForm.language">
        <SelectTrigger class="w-[200px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="language in languages" :key="language.value" :value="language.value">
              {{ language.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span class="text-muted-foreground text-sm">
        This is the language that will be used in the dashboard.
      </span>
      <div v-if="errors?.language" class="text-sm text-destructive">
        <span v-for="error in errors.language._errors" :key="error">{{ error }}</span>
      </div>
    </div> -->
    <div class="flex justify-start">
      <Button type="submit">
        Update account
      </Button>
    </div>
  </Form>
</template>
