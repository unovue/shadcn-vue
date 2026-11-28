<script setup lang="ts">
import { Slider } from "@/registry/bases/vase/ui/slider"
</script>

<template>
  <Slider :default-value="[50]" :max="100" :step="1" :disabled="true" />
</template>
