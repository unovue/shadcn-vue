<script setup lang="ts">
import { defineProps } from 'vue'
import { AspectRatio, type AspectRatioProps } from 'radix-vue'

const props = defineProps<AspectRatioProps>()
</script>

<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>
