<script setup lang="ts">
import { getColors } from '~/lib/colors'

const colors = getColors()
</script>

<template>
  <div class="grid gap-8 lg:gap-16 xl:gap-20">
    <ColorPalette v-for="colorPalette in colors" :key="colorPalette.name" :color-palette="colorPalette" />
  </div>
</template>
