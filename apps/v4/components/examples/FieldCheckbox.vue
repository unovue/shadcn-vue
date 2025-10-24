<script setup lang="ts">
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import { Field, FieldLabel } from '@/registry/new-york-v4/ui/field'
</script>

<template>
  <FieldLabel for="checkbox-demo">
    <Field orientation="horizontal">
      <Checkbox id="checkbox-demo" :default-value="true" />
      <FieldLabel for="checkbox-demo" class="line-clamp-1">
        I agree to the terms and conditions
      </FieldLabel>
    </Field>
  </FieldLabel>
</template>
