<script setup lang="ts">
import { Checkbox } from '@/styles/vase-vega/ui/checkbox'
import { Label } from '@/styles/vase-vega/ui/label'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</template>
