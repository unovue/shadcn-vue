<script setup lang="ts">
import { ContextMenuTrigger, type ContextMenuTriggerProps } from 'radix-vue'

const props = defineProps<ContextMenuTriggerProps>()
</script>

<template>
  <ContextMenuTrigger v-bind="props">
    <slot />
  </ContextMenuTrigger>
</template>
