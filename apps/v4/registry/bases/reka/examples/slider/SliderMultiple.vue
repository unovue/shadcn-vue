<script setup lang="ts">
import { Slider } from "@/registry/bases/reka/ui/slider"
</script>

<template>
  <Slider :default-value="[10, 20, 70]" :max="100" :step="10" />
</template>
