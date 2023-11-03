<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/default/ui/form'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'
import { Button } from '@/lib/registry/new-york/ui/button'
import { toast } from '@/lib/registry/new-york/ui/toast'

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',

  },
  {
    id: 'desktop',
    label: 'Desktop',

  },
  {
    id: 'downloads',
    label: 'Downloads',

  },
  {
    id: 'documents',
    label: 'Documents',

  },
] as const

const displayFormSchema = toTypedSchema(z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: ['recents', 'home'],
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
  <div>
    <h3 class="text-lg font-medium">
      Display
    </h3>
    <p class="text-sm text-muted-foreground">
      Turn items on or off to control what's displayed in the app.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem>
        <div class="mb-4">
          <FormLabel class="text-base">
            Sidebar
          </FormLabel>
          <FormDescription>
            Select the items you want to display in the sidebar.
          </FormDescription>
        </div>

        <FormField v-for="item in items" v-slot="{ value, handleChange }" :key="item.id" name="items">
          <FormItem :key="item.id" class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                @update:checked="(checked) => {
                  if (Array.isArray(value)) {
                    handleChange(checked ? [...value, item.id] : value.filter(id => id !== item.id))
                  }
                }"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start mt-4">
      <Button type="submit">
        Update display
      </Button>
    </div>
  </form>
</template>
