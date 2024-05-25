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
  <NumberField
    :default-value="5"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  >
    <NumberFieldLabel>Number</NumberFieldLabel>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
