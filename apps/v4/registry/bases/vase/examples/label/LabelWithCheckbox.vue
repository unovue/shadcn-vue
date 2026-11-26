<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import { Field } from "@/registry/bases/vase/ui/field"
import { Label } from "@/registry/bases/vase/ui/label"
</script>

<template>
  <Example title="With Checkbox">
    <Field orientation="horizontal">
      <Checkbox id="label-demo-terms" />
      <Label for="label-demo-terms">
        Accept terms and conditions
      </Label>
    </Field>
  </Example>
</template>
