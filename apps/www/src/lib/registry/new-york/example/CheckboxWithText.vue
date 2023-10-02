<script setup lang="ts">
import { Checkbox } from '@/lib/registry/new-york/ui/checkbox'
</script>

<template>
  <div class="items-top flex gap-x-2">
    <Checkbox id="terms1" />
    <div class="grid gap-1.5 leading-none">
      <label
        for="terms1"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
      <p class="text-sm text-muted-foreground">
        You agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  </div>
</template>
