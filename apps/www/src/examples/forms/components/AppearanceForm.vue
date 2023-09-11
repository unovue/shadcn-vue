<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { cn } from '@/lib/utils'

import { Label } from '@/lib/registry/new-york/ui/label'
import { Separator } from '@/lib/registry/new-york/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/lib/registry/default/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { Button } from '@/lib/registry/new-york/ui/button'

const appearenceForm = ref({
  theme: 'light',
  font: '',
})

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
const errors = ref<z.ZodFormattedError<AppearanceFormValues> | null>(null)

async function handleSubmit() {
  const result = appearanceFormSchema.safeParse(appearenceForm.value)
  if (!result.success) {
    errors.value = result.error.format()
    console.log(errors.value)
    return
  }

  console.log('Form submitted!', appearenceForm.value)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Appearence
    </h3>
    <p class="text-sm text-muted-foreground">
      Customize the appearance of the app. Automatically switch between day and night themes.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit.prevent="handleSubmit">
    <div class="grid gap-2">
      <Label for="font" :class="cn('text-sm', errors?.font && 'text-destructive')">
        Font
      </Label>
      <Select id="font" v-model="appearenceForm.font">
        <SelectTrigger class="w-[200px]">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="inter">
              Inter
            </SelectItem>
            <SelectItem value="manrope">
              Manrope
            </SelectItem>
            <SelectItem value="system">
              System
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span class="text-muted-foreground text-xs">
        Set the font you want to use in the dashboard.
      </span>
      <div v-if="errors?.font" class="text-sm text-destructive">
        <span v-for="error in errors.font._errors" :key="error">{{ error }}</span>
      </div>
    </div>

    <div class="grid gap-2">
      <Label for="theme" :class="cn('text-sm', errors?.theme && 'text-destructive')">
        Theme
      </Label>
      <span class="text-muted-foreground text-xs">
        Select the theme for the dashboard.
      </span>
      <RadioGroup
        v-model="appearenceForm.theme"
        default-value="light"
        class="grid max-w-md grid-cols-2 gap-8 pt-2"
      >
        <div class="grid gap-2">
          <Label class="[&:has([data-state=checked])>div]:border-primary">
            <div>
              <RadioGroupItem value="light" class="sr-only" />
            </div>
            <div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div class="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span class="block w-full p-2 text-center font-normal">
              Light
            </span>
          </Label>
        </div>
        <div>
          <Label class="[&:has([data-state=checked])>div]:border-primary">
            <div>
              <RadioGroupItem value="dark" class="sr-only" />
            </div>
            <div class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div class="space-y-2 rounded-sm bg-slate-950 p-2">
                <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div class="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div class="h-4 w-4 rounded-full bg-slate-400" />
                  <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div class="h-4 w-4 rounded-full bg-slate-400" />
                  <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span class="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </Label>
        </div>

        <div class="col-span-2">
          <span v-if="errors?.theme" class="text-sm text-destructive">
            <span v-for="error in errors.theme._errors" :key="error">{{ error }}</span>
          </span>
        </div>
      </RadioGroup>
    </div>

    <div class="flex justify-start">
      <Button type="submit">
        Update preferences
      </Button>
    </div>
  </form>
</template>
