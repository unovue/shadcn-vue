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
  <NumberField :default-value="18" :min="0">
    <Label for="age">Age</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput id="age" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
