<script setup lang="ts">
import { Label } from '@/lib/registry/default/ui/label'
import { RadioGroup, RadioGroupItem } from '@/lib/registry/default/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="comfortable">
    <div className="flex items-center space-x-2">
      <RadioGroupItem id="r1" value="default" />
      <Label html-for="r1">Default</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem id="r2" value="comfortable" />
      <Label html-for="r2">Comfortable</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem id="r3" value="compact" />
      <Label html-for="r3">Compact</Label>
    </div>
  </RadioGroup>
</template>
