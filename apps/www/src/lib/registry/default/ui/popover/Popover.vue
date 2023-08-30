<script setup lang="ts">
import { PopoverRoot, type PopoverRootProps } from 'radix-vue'

const props = defineProps<PopoverRootProps>()
</script>

<template>
  <PopoverRoot v-bind="props">
    <slot />
  </PopoverRoot>
</template>
