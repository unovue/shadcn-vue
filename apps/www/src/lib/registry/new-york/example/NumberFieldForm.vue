<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/lib/registry/new-york/ui/number-field'
import { toast } from '@/lib/registry/new-york/ui/toast'

const formSchema = toTypedSchema(z.object({
  payment: z.number().min(10, 'Min 10 euros to send payment').max(5000, 'Max 5000 euros to send payment'),
}))

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    payment: 10,
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
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ value }" name="payment">
      <FormItem>
        <FormLabel>Payment</FormLabel>
        <NumberField
          class="gap-2"
          :min="0"
          :format-options="{
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting',
          }"
          :model-value="value"
          @update:model-value="(v) => {
            if (v) {
              setFieldValue('payment', v)
            }
            else {
              setFieldValue('payment', undefined)
            }
          }"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <FormControl>
              <NumberFieldInput />
            </FormControl>
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <FormDescription>
          Enter value between 10 and 5000.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
