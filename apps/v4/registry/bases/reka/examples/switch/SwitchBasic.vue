<script setup lang="ts">
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Switch } from "@/registry/bases/reka/ui/switch"
</script>

<template>
  <Field orientation="horizontal">
    <Switch id="switch-basic" />
    <FieldLabel html-for="switch-basic">
      Airplane Mode
    </FieldLabel>
  </Field>
</template>
