<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Field } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import { Label } from "@/registry/bases/reka/ui/label"
</script>

<template>
  <Example title="Disabled">
    <Field :data-disabled="true">
      <Label html-for="label-demo-disabled">
        Disabled
      </Label>
      <Input id="label-demo-disabled" placeholder="Disabled" disabled />
    </Field>
  </Example>
</template>
