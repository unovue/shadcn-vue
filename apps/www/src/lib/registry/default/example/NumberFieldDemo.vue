<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@/lib/registry/default/ui/number-field'
</script>

<template>
  <NumberField :default-value="18" :min="0">
    <NumberFieldLabel>Age</NumberFieldLabel>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
