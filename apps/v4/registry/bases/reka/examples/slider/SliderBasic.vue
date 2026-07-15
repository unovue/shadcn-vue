<script setup lang="ts">
import { Slider } from "@/registry/bases/reka/ui/slider"
</script>

<template>
  <Slider :default-value="[50]" :max="100" :step="1" />
</template>
