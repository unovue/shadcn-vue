<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/lib/registry/new-york/ui/number-field'
import { Label } from '@/lib/registry/new-york/ui/label'
</script>

<template>
  <NumberField id="age" :default-value="18" :min="0">
    <Label for="age">Age</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
