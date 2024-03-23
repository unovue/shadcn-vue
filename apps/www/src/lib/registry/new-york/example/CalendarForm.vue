<script setup lang="ts">
import { h, ref } from 'vue'
import { DateFormatter, getLocalTimeZone, toDate, today } from 'flat-internationalized-date'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Calendar } from '@/lib/registry/default/ui/calendar'
import { Button } from '@/lib/registry/default/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/default/ui/form'
import { toast } from '@/lib/registry/default/ui/toast'
import { cn } from '@/lib/utils'

const df = DateFormatter('en-US')

const formSchema = toTypedSchema(z.object({
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
}))

const value = ref(today(getLocalTimeZone()))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    date: toDate(value.value, getLocalTimeZone()),
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />

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
                <span>{{ value ? df(value!) : "Pick a date" }}</span>
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
