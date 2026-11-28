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
    :default-value="0.05"
    :step="0.01"
    :format="{
      style: 'percent',
    }"
  >
    <Label for="percent">Percent</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput id="percent" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
