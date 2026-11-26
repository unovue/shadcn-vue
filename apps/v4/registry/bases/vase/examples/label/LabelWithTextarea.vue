<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Field } from "@/registry/bases/vase/ui/field"
import { Label } from "@/registry/bases/vase/ui/label"
import { Textarea } from "@/registry/bases/vase/ui/textarea"
</script>

<template>
  <Example title="With Textarea">
    <Field>
      <Label for="label-demo-message">
        Message
      </Label>
      <Textarea id="label-demo-message" placeholder="Message" />
    </Field>
  </Example>
</template>
