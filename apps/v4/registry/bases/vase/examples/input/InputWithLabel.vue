<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
</script>

<template>
  <Field>
    <FieldLabel for="input-demo-email">
      Email
    </FieldLabel>
    <Input
      id="input-demo-email"
      type="email"
      placeholder="name@example.com"
    />
  </Field>
</template>
