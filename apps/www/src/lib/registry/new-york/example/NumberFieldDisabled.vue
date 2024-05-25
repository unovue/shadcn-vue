<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@/lib/registry/new-york/ui/number-field'
</script>

<template>
  <NumberField :default-value="18" disabled>
    <NumberFieldLabel>Age</NumberFieldLabel>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
