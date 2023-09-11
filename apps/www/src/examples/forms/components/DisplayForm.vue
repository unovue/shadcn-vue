<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { cn } from '@/lib/utils'

import { Label } from '@/lib/registry/new-york/ui/label'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'
import { Button } from '@/lib/registry/new-york/ui/button'

const displayForm = ref({
  items: ['recents', 'home'],
})

const items = [
  {
    id: 'recents',
    label: 'Recents',
    checked: true,
  },
  {
    id: 'home',
    label: 'Home',
    checked: true,
  },
  {
    id: 'applications',
    label: 'Applications',
    checked: false,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    checked: false,
  },
  {
    id: 'downloads',
    label: 'Downloads',
    checked: false,
  },
  {
    id: 'documents',
    label: 'Documents',
    checked: false,
  },
] as const

const displayFormSchema = z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>
const errors = ref<z.ZodFormattedError<DisplayFormValues> | null>(null)

async function handleSubmit() {
  const result = displayFormSchema.safeParse(displayForm.value)
  if (!result.success) {
    errors.value = result.error.format()
    console.log(errors.value)
    return
  }

  console.log('Form submitted!', displayForm.value)
}
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
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <Label for="sidebar" :class="cn('text-md', errors?.items && 'text-destructive')">
        Sidebar
      </Label>
      <span class="text-xs text-muted-foreground">
        Select the items you want to display in the sidebar.
      </span>
    </div>
    <div v-for="item in items" :key="item.id" class="pb-1">
      <div class="flex flex-row items-center space-x-3 space-y-0">
        <Checkbox :id="item.id" v-model:checked="item.checked" :value="item.id" />
        <Label :for="item.id">{{ item.label }}</Label>
      </div>
    </div>
    <div class="flex justify-start mt-4">
      <Button type="submit">
        Update display
      </Button>
    </div>
  </form>
</template>
