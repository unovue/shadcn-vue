<script setup lang="ts">
import { ContextMenuLabel, type ContextMenuLabelProps } from 'radix-vue'

const props = defineProps<ContextMenuLabelProps>()
</script>

<template>
  <div class="px-2 py-1.5 text-sm font-semibold">
    <ContextMenuLabel v-bind="props">
      <slot />
    </ContextMenuLabel>
  </div>
</template>
