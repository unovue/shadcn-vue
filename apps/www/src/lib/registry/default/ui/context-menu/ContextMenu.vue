<script setup lang="ts">
import { ContextMenuRoot, type ContextMenuRootProps } from 'radix-vue'

const props = defineProps<ContextMenuRootProps>()
</script>

<template>
  <ContextMenuRoot v-bind="props">
    <slot />
  </ContextMenuRoot>
</template>
