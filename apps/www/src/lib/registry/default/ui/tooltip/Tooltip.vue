<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useEmitAsProps } from 'radix-vue'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <TooltipRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </TooltipRoot>
</template>
