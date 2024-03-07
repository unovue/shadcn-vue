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
import { toast } from '@/lib/registry/new-york/ui/toast'
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from '@/lib/registry/new-york/ui/input-otp'

const formSchema = toTypedSchema(z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(({ pin }) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(pin, null, 2))),
  })
})
</script>

<template>
  <form class="w-2/3 space-y-6 mx-auto" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="pin">
      <FormItem>
        <FormLabel>OTP</FormLabel>
        <FormControl>
          <InputOtp
            v-slot="{ slots }"
            :maxlength="6"
            v-bind="componentField"
          >
            <InputOtpGroup>
              <InputOtpSlot v-for="(slot, index) in slots" v-bind="slot" :key="index" />
            </InputOtpGroup>
          </InputOtp>
        </FormControl>
        <FormDescription>
          Please enter the one-time password sent to your phone.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button>Submit</Button>
  </form>
</template>
