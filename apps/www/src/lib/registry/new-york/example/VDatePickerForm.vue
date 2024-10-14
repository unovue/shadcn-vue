<script setup lang="ts">
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/new-york/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/new-york/ui/popover'
import { toast } from '@/lib/registry/new-york/ui/toast'
import { Calendar } from '@/lib/registry/new-york/ui/v-calendar'
import { cn } from '@/lib/utils'

import { CalendarIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { format } from 'date-fns'
import { useForm } from 'vee-validate'

import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField, value }" name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline" :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <span>{{ value ? format(value, "PPP") : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
