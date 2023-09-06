<script setup lang="ts">
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <div>
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  </div>
</template>
