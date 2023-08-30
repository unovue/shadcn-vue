<script setup lang="ts">
import {
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
} from 'radix-vue'

const props = defineProps<ContextMenuSeparatorProps>()
</script>

<template>
  <ContextMenuSeparator v-bind="props" class="-mx-1 my-1 h-px bg-secondary" />
</template>
