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
    :default-value="0.05"
    :step="0.01"
    :format-options="{
      style: 'percent',
    }"
  >
    <NumberFieldLabel>Percent</NumberFieldLabel>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
