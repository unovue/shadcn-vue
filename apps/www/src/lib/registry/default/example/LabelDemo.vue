<script setup lang="ts">
import { Checkbox } from '@/lib/registry/default/ui/checkbox'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  </div>
</template>
