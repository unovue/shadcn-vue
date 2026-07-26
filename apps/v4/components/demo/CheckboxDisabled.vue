<script setup lang="ts">
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import { Label } from '@/registry/new-york-v4/ui/label'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" disabled />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</template>
