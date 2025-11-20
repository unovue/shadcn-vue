<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'
import { Slider } from '@/registry/new-york-v4/ui/slider'

const value = ref([0.3, 0.7])
</script>

<template>
  <div class="flex w-full max-w-sm flex-col flex-wrap gap-6 md:flex-row">
    <Slider :default-value="[50]" :max="100" :step="1" />
    <Slider :default-value="[25, 50]" :max="100" :step="1" />
    <Slider :default-value="[10, 20]" :max="100" :step="10" />
    <div class="flex w-full items-center gap-6">
      <Slider :default-value="[50]" :max="100" :step="1" orientation="vertical" />
      <Slider :default-value="[25]" :max="100" :step="1" orientation="vertical" />
    </div>

    <div class="grid w-full gap-3">
      <div class="flex items-center justify-between gap-2">
        <Label for="slider-demo-temperature">Temperature</Label>
        <span class="text-muted-foreground text-sm">
          {{ value.join(", ") }}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        v-model="value"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </div>
  </div>
</template>
