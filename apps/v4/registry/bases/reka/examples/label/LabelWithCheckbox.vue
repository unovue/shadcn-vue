<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import { Field } from "@/registry/bases/reka/ui/field"
import { Label } from "@/registry/bases/reka/ui/label"
</script>

<template>
  <Example title="With Checkbox">
    <Field orientation="horizontal">
      <Checkbox id="label-demo-terms" />
      <Label html-for="label-demo-terms">
        Accept terms and conditions
      </Label>
    </Field>
  </Example>
</template>
