<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import { toast } from '@/lib/registry/default/ui/toast'
import { AutoForm, AutoFormField } from '@/lib/registry/default/ui/auto-form'

const schema = z.object({
  username: z.string(),
})

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      username: {
        hideLabel: true,
      },
    }"
    @submit="onSubmit"
  >
    <template #username="slotProps">
      <div class="flex items-start gap-3">
        <div class="flex-1">
          <AutoFormField v-bind="slotProps" />
        </div>
        <div>
          <Button type="submit">
            Update
          </Button>
        </div>
      </div>
    </template>
  </AutoForm>
</template>
