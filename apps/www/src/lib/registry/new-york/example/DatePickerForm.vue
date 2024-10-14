<script setup lang="ts">
import { Button } from '@/lib/registry/new-york/ui/button'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/new-york/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/new-york/ui/popover'
import { toast } from '@/lib/registry/new-york/ui/toast'
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { CalendarIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'radix-vue/date'
import { useForm } from 'vee-validate'
import { computed, h, ref } from 'vue'
import { z } from 'zod'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(z.object({
  dob: z
    .string()
    .refine(v => v, { message: 'A date of birth is required.' }),
}))

const placeholder = ref()

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {

  },
})

const value = computed({
  get: () => values.dob ? parseDate(values.dob) : undefined,
  set: val => val,
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
    <FormField name="dob">
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
                <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="value"
              calendar-label="Date of birth"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(v) => {
                if (v) {
                  setFieldValue('dob', v.toString())
                }
                else {
                  setFieldValue('dob', undefined)
                }
              }"
            />
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
