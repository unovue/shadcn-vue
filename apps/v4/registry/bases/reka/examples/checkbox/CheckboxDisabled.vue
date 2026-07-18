<script setup lang="ts">
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Disabled">
    <Field orientation="horizontal">
      <Checkbox id="toggle" disabled />
      <FieldLabel html-for="toggle">
        Enable notifications
      </FieldLabel>
    </Field>
  </Example>
</template>
