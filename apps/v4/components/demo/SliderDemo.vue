<script setup lang="ts">
import { Slider } from '@/registry/new-york-v4/ui/slider'
</script>

<template>
  <Slider
    :default-value="[50]"
    :max="100"
    :step="1"
    class="w-[60%]"
  />
</template>
