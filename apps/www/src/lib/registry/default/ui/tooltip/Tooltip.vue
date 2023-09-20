<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps } from 'radix-vue'
import { useEmitAsProps } from '@/lib/utils'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <TooltipRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </TooltipRoot>
</template>
