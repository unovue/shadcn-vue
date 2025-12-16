<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/bases/reka/ui/field"
import { Switch } from "@/registry/bases/reka/ui/switch"
</script>

<template>
  <FieldLabel html-for="switch-focus-mode">
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
