<script setup lang="ts">
import { HoverCardRoot, type HoverCardRootProps } from 'radix-vue'

const props = defineProps<HoverCardRootProps>()
</script>

<template>
  <HoverCardRoot v-bind="props">
    <slot />
  </HoverCardRoot>
</template>
