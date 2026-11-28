<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/bases/vase/ui/field"
import { Switch } from "@/registry/bases/vase/ui/switch"
</script>

<template>
  <FieldLabel for="switch-focus-mode">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Share across devices</FieldTitle>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the
          app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  </FieldLabel>
</template>
