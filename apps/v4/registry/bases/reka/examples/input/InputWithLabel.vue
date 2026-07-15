<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
</script>

<template>
  <Field>
    <FieldLabel html-for="input-demo-email">
      Email
    </FieldLabel>
    <Input
      id="input-demo-email"
      type="email"
      placeholder="name@example.com"
    />
  </Field>
</template>
