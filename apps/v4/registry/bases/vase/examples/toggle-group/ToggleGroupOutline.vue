<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/registry/bases/vase/ui/toggle-group"
</script>

<template>
  <ToggleGroup variant="outline" :default-value="['all']">
    <ToggleGroupItem value="all" aria-label="Toggle all">
      All
    </ToggleGroupItem>
    <ToggleGroupItem value="missed" aria-label="Toggle missed">
      Missed
    </ToggleGroupItem>
  </ToggleGroup>
</template>
