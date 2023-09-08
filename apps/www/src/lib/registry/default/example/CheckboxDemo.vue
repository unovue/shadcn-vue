<script setup lang="ts">
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <label
      htmlFor="terms"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
