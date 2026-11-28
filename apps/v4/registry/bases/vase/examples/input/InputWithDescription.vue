<script setup lang="ts">
import { Field, FieldDescription, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
</script>

<template>
  <Field>
    <FieldLabel for="input-demo-username">
      Username
    </FieldLabel>
    <Input
      id="input-demo-username"
      type="text"
      placeholder="Enter your username"
    />
    <FieldDescription>
      Choose a unique username for your account.
    </FieldDescription>
  </Field>
</template>
