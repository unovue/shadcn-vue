<script setup lang="ts">
import { Label } from '@/lib/registry/new-york/ui/label'
import { RadioGroup, RadioGroupItem } from '@/lib/registry/new-york/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="comfortable" :orientation="'vertical'">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r1" value="default" />
      <Label for="r1">Default</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r2" value="comfortable" />
      <Label for="r2">Comfortable</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r3" value="compact" />
      <Label for="r3">Compact</Label>
    </div>
  </RadioGroup>
</template>
