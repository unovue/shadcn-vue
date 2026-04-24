<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
</script>

<template>
  <Field>
    <FieldLabel html-for="input-demo-disabled">
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
