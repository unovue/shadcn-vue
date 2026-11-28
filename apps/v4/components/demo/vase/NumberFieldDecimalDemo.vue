<script setup lang="ts">
import { Label } from '@/styles/vase-vega/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/styles/vase-vega/ui/number-field'
</script>

<template>
  <NumberField
    :default-value="5"
    :format="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  >
    <Label for="number">Number</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput id="number" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
