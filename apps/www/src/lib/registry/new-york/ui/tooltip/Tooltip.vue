<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useEmitAsProps } from 'radix-vue'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
</script>

<template>
  <TooltipRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </TooltipRoot>
</template>
