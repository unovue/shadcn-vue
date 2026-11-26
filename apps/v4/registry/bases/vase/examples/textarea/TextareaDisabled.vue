<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Textarea } from "@/registry/bases/vase/ui/textarea"
</script>

<template>
  <Field>
    <FieldLabel for="textarea-demo-disabled">
      Message
    </FieldLabel>
    <Textarea
      id="textarea-demo-disabled"
      placeholder="Type your message here."
      :disabled="true"
    />
  </Field>
</template>
