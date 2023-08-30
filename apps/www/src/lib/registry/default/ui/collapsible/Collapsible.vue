<script setup lang="ts">
import { CollapsibleRoot, type CollapsibleRootProps } from 'radix-vue'

const props = defineProps<CollapsibleRootProps>()
</script>

<template>
  <CollapsibleRoot v-bind="props">
    <slot />
  </CollapsibleRoot>
</template>
