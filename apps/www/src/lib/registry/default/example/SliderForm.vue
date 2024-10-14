<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/default/ui/form'
import { Slider } from '@/lib/registry/default/ui/slider'
import { toast } from '@/lib/registry/default/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  duration: z.array(
    z.number().min(0).max(60),
  ),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    duration: [30],
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
    <FormField v-slot="{ componentField, value }" name="duration">
      <FormItem>
        <FormLabel>Duration</FormLabel>
        <FormControl>
          <Slider
            v-bind="componentField"
            :default-value="[30]"
            :max="100"
            :min="0"
            :step="5"
          />
          <FormDescription class="flex justify-between">
            <span>How many minutes are you available?</span>
            <span>{{ value?.[0] }} min</span>
          </FormDescription>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
