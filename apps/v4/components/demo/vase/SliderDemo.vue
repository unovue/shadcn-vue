<script setup lang="ts">
import { Slider } from '@/styles/vase-vega/ui/slider'
</script>

<template>
  <Slider
    :default-value="[50]"
    :max="100"
    :step="1"
    class="data-horizontal:w-[60%]"
  />
</template>
