<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Description">
    <Field orientation="horizontal">
      <Checkbox id="terms-2" :default-checked="true" />
      <FieldContent>
        <FieldLabel for="terms-2">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  </Example>
</template>
