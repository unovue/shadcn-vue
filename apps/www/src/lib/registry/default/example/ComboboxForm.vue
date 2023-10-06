<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/lib/registry/default/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/lib/registry/default/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/registry/default/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/registry/default/ui/popover'

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
]

const formSchema = toTypedSchema(z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
}))

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField name="language">
      <FormItem class="flex flex-col">
        <FormLabel>Language</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="cn('w-[200px] justify-between', !values.language && 'text-muted-foreground')"
              >
                {{ values.language ? languages.find(
                  (language) => language.value === values.language,
                )?.label : 'Select language...' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="language in languages"
                  :key="language.value"
                  :value="language.label"
                  @select="() => {
                    setValues({
                      language: language.value,
                    })
                  }"
                >
                  <Check
                    :class="cn('mr-2 h-4 w-4', language.value === values.language ? 'opacity-100' : 'opacity-0')"
                  />
                  {{ language.label }}
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
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
