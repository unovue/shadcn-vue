<script setup lang="ts">
import { Button } from '@/registry/default/ui/button'
import { Checkbox } from '@/registry/default/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/default/ui/form'
import { toast } from '@/registry/default/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  mobile: z.boolean().default(false).optional(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    mobile: true,
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
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="mobile">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Use different settings for my mobile devices</FormLabel>
          <FormDescription>
            You can manage your mobile notifications in the
            <a href="/examples/forms">mobile settings</a> page.
          </FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
