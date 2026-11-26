<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Basic">
    <Field orientation="horizontal">
      <Checkbox id="terms" />
      <FieldLabel for="terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </Example>
</template>
