<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useConfigStore } from '@/stores/config'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Input } from '@/lib/registry/new-york/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/registry/new-york/ui/form'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/registry/new-york/ui/sheet'
import RadixIconsGear from '~icons/radix-icons/gear'

const { codeConfig, setCodeConfig } = useConfigStore()

const formSchema = toTypedSchema(z.object({
  prefix: z.string().default(''),
  componentsPath: z.string().default('@/components'),
  utilsPath: z.string().default('@/utils'),
}))

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: codeConfig.value,
})

const onSubmit = handleSubmit((values) => {
  setCodeConfig(values)
  setValues(values)
})
</script>

<template>
  <Sheet
    @update:open="(open) => {
      if (open) setValues(codeConfig)
    }"
  >
    <SheetTrigger as-child>
      <Button
        class="w-9 h-9"
        :variant="'ghost'"
        :size="'icon'"
      >
        <RadixIconsGear class="w-5 h-5" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <form @submit="onSubmit">
        <SheetHeader>
          <SheetTitle>Edit code config</SheetTitle>
          <SheetDescription>
            Configure how the CodeBlock should render on the site.
          </SheetDescription>
        </SheetHeader>

        <div class="my-4">
          <!-- <FormField v-slot="{ componentField }" name="prefix">
            <FormItem>
              <FormLabel>Prefix</FormLabel>
              <FormControl>
                <Input placeholder="" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField> -->
          <FormField v-slot="{ componentField }" name="componentsPath">
            <FormItem>
              <FormLabel>Components Path</FormLabel>
              <FormControl>
                <Input placeholder="" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="utilsPath">
            <FormItem>
              <FormLabel>Utils Path</FormLabel>
              <FormControl>
                <Input placeholder="" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
</template>
