<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
</script>

<template>
  <Field>
    <FieldLabel for="input-demo-disabled">
      Email
    </FieldLabel>
    <Input
      id="input-demo-disabled"
      type="email"
      placeholder="Email"
      :disabled="true"
    />
  </Field>
</template>
