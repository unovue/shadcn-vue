<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import { z } from 'zod'
import { Button } from '@/registry/new-york/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/new-york/ui/form'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/registry/new-york/ui/tags-input'
import { toast } from '@/registry/new-york/ui/toast'

const formSchema = toTypedSchema(z.object({
  fruits: z.array(z.string()).min(1).max(3),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    fruits: ['Apple', 'Banana'],
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
    <FormField v-slot="{ componentField }" name="fruits">
      <FormItem>
        <FormLabel>Fruits</FormLabel>
        <FormControl>
          <TagsInput
            :model-value="componentField.modelValue"
            @update:model-value="componentField['onUpdate:modelValue']"
          >
            <TagsInputItem v-for="item in componentField.modelValue" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Fruits..." />
          </TagsInput>
        </FormControl>
        <FormDescription>
          Select your favorite fruits.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
