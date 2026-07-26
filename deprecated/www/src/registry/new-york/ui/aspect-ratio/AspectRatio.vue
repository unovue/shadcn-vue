<script setup lang="ts">
import type { AspectRatioProps } from "reka-ui"
import { AspectRatio } from "reka-ui"

const props = defineProps<AspectRatioProps>()
</script>

<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>
