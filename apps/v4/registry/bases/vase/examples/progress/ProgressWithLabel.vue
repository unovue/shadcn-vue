<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Progress } from "@/registry/bases/vase/ui/progress"
</script>

<template>
  <Example title="With Label">
    <Field>
      <FieldLabel for="progress-upload">
        <span>Upload progress</span>
        <span class="ml-auto">66%</span>
      </FieldLabel>
      <Progress id="progress-upload" :value="66" class="w-full" />
    </Field>
  </Example>
</template>
