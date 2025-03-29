<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york/ui/button'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@/registry/new-york/ui/combobox'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/new-york/ui/form'

import { toast } from '@/registry/new-york/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

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

const formSchema = toTypedSchema(z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
}))

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    language: '',
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
    <FormField name="language">
      <FormItem class="flex flex-col">
        <FormLabel>Language</FormLabel>

        <Combobox by="label">
          <FormControl>
            <ComboboxAnchor>
              <div class="relative w-full max-w-sm items-center">
                <ComboboxInput :display-value="(val) => val?.label ?? ''" placeholder="Select framework..." />
                <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                  <ChevronsUpDown class="size-4 text-muted-foreground" />
                </ComboboxTrigger>
              </div>
            </ComboboxAnchor>
          </FormControl>

          <ComboboxList>
            <ComboboxEmpty>
              Nothing found.
            </ComboboxEmpty>

            <ComboboxGroup>
              <ComboboxItem
                v-for="language in languages"
                :key="language.value"
                :value="language"
                @select="() => {
                  setFieldValue('language', language.value)
                }"
              >
                {{ language.label }}

                <ComboboxItemIndicator>
                  <Check :class="cn('ml-auto h-4 w-4')" />
                </ComboboxItemIndicator>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>

        <FormDescription>
          This is the language that will be used in the dashboard.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
