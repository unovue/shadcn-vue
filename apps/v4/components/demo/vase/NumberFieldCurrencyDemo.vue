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
    :default-value="1500"
    :format="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }"
  >
    <Label for="balance">Balance</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput id="balance" />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
