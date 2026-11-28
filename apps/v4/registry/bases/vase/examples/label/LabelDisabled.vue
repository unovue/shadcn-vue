<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Field } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
import { Label } from "@/registry/bases/vase/ui/label"
</script>

<template>
  <Example title="Disabled">
    <Field :data-disabled="true">
      <Label for="label-demo-disabled">
        Disabled
      </Label>
      <Input id="label-demo-disabled" placeholder="Disabled" disabled />
    </Field>
  </Example>
</template>
