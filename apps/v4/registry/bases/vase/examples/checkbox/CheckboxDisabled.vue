<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Disabled">
    <Field orientation="horizontal">
      <Checkbox id="toggle" disabled />
      <FieldLabel for="toggle">
        Enable notifications
      </FieldLabel>
    </Field>
  </Example>
</template>
