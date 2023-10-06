<script setup lang="ts">
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'
</script>

<template>
  <div class="items-top flex space-x-2">
    <Checkbox id="terms1" disabled />
    <label
      for="terms2"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
