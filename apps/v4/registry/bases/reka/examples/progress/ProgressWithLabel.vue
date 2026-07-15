<script setup lang="ts">
import { Example } from "@/registry/bases/reka/components/example"
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Progress } from "@/registry/bases/reka/ui/progress"
</script>

<template>
  <Example title="With Label">
    <Field>
      <FieldLabel html-for="progress-upload">
        <span>Upload progress</span>
        <span class="ml-auto">66%</span>
      </FieldLabel>
      <Progress id="progress-upload" :model-value="66" class="w-full" />
    </Field>
  </Example>
</template>
