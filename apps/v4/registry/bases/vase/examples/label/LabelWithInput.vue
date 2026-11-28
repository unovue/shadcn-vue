<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Field } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
import { Label } from "@/registry/bases/vase/ui/label"
</script>

<template>
  <Example title="With Input">
    <Field>
      <Label for="label-demo-username">Username</Label>
      <Input id="label-demo-username" placeholder="Username" />
    </Field>
  </Example>
</template>
