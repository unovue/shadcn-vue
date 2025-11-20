<script setup lang="ts">
import type { ColorPalette } from '@/lib/colors'
// import { ColorFormatSelector } from "@/components/color-format-selector"

defineProps<{
  colorPalette: ColorPalette
}>()
</script>

<template>
  <div :id="colorPalette.name" class="scroll-mt-20 rounded-lg">
    <div class="flex items-center px-4">
      <div class="flex-1 pl-1 text-sm font-medium">
        <h2 class="capitalize">
          {{ colorPalette.name }}
        </h2>
      </div>
      <ColorFormatSelector
        :color="colorPalette.colors[0]"
        class="ml-auto"
      />
    </div>
    <div class="flex flex-col gap-4 py-4 sm:flex-row sm:gap-2">
      <Color v-for="color in colorPalette.colors" :key="color.hex" :color="color" />
    </div>
  </div>
</template>
