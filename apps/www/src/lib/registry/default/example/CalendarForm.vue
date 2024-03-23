<script setup lang="ts">
import { h, ref } from 'vue'
import { DateFormatter, type DateValue, createCalendarDate, getLocalTimeZone, parseDate, today } from 'flat-internationalized-date'
import { useDateFormatter } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/registry/default/ui/popover'
import { toast } from '@/lib/registry/default/ui/toast'
import { cn } from '@/lib/utils'

const df = useDateFormatter('en')
const dateValue = ref<DateValue | undefined>()

const formSchema = toTypedSchema(z.object({
  dob: z
    .string()
    .refine(v => v, { message: 'A date of birth is required.' }),
}))

const placeholder = ref()

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
    <FormField v-slot="{ value }" name="dob">
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
                <span>{{ value ? JSON.stringify(value) : "Pick a date" }} {{ JSON.stringify(value) }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="dateValue"
              calendar-label="Date of birth"
              initial-focus
              :min-value="createCalendarDate({
                day: 1,
                month: 2,
                year: 2024,
              })"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(v) => {
                console.log(v)
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
