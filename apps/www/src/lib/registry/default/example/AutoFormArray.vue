<script setup lang="ts">
import { AutoForm } from '@/lib/registry/default/ui/auto-form'
import { Button } from '@/lib/registry/default/ui/button'
import { toast } from '@/lib/registry/default/ui/toast'
import { h } from 'vue'
import * as z from 'zod'

const schema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    )
    .describe('Guests invited to the party'),
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
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
