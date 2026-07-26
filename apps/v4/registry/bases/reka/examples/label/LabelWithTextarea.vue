<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Field } from "@/registry/bases/reka/ui/field"
import { Label } from "@/registry/bases/reka/ui/label"
import { Textarea } from "@/registry/bases/reka/ui/textarea"
</script>

<template>
  <Example title="With Textarea">
    <Field>
      <Label html-for="label-demo-message">
        Message
      </Label>
      <Textarea id="label-demo-message" placeholder="Message" />
    </Field>
  </Example>
</template>
