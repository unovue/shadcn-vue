<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Textarea } from "@/registry/bases/vase/ui/textarea"
</script>

<template>
  <Field>
    <FieldLabel for="textarea-demo-message">
      Message
    </FieldLabel>
    <Textarea
      id="textarea-demo-message"
      placeholder="Type your message here."
      :rows="6"
    />
  </Field>
</template>
