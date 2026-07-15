<script setup lang="ts">
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Basic">
    <Field orientation="horizontal">
      <Checkbox id="terms" />
      <FieldLabel html-for="terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </Example>
</template>
