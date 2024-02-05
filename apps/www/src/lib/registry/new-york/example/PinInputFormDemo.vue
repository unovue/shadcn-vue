<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  PinInput,
  PinInputInput,
} from '@/lib/registry/new-york/ui/pin-input'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/new-york/ui/form'
import { toast } from '@/lib/registry/new-york/ui/toast'

const formSchema = toTypedSchema(z.object({
  pin: z.array(z.string().min(1)).length(5),
}))

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    pin: [],
  },
})

const onSubmit = handleSubmit(({ pin }) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(pin.join(''), null, 2))),
  })
})

const handleComplete = (e: string[]) => console.log(e.join(''))
</script>

<template>
  <form class="w-2/3 space-y-6 mx-auto" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="pin">
      <FormItem>
        <FormLabel>Otp</FormLabel>
        <FormControl>
          <PinInput
            id="pin-input"
            placeholder="○"
            class="flex gap-2 items-center mt-1"
            otp
            type="number"
            :name="componentField.name"
            @complete="handleComplete"
            @update:model-value="(arrStr) => {
              setValues({
                pin: arrStr,
              })
            }"
          >
            <PinInputInput
              v-for="(id, index) in 5"
              :key="id"
              :index="index"
            />
          </PinInput>
        </FormControl>
        <FormDescription>
          Allows users to input a sequence of one-character alphanumeric inputs.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button>Submit</Button>
  </form>
</template>
