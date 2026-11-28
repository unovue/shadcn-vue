<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Invalid">
    <Field orientation="horizontal" data-invalid>
      <Checkbox id="terms-3" aria-invalid />
      <FieldLabel for="terms-3">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </Example>
</template>
