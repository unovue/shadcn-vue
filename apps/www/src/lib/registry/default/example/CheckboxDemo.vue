<script setup lang="ts">
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" />
    <label
      for="terms"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
