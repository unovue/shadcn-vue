<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Switch } from "@/registry/bases/vase/ui/switch"
</script>

<template>
  <Field orientation="horizontal">
    <Switch id="switch-basic" />
    <FieldLabel for="switch-basic">
      Airplane Mode
    </FieldLabel>
  </Field>
</template>
