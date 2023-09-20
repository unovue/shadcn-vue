<script setup lang="ts">
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
</script>

<template>
  <div className="items-top flex space-x-2">
    <Checkbox id="terms1" disabled />
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor="terms1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
      <p className="text-sm text-muted-foreground">
        You agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  </div>
</template>
