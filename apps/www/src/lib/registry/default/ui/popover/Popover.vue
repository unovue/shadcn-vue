<script setup lang="ts">
import { PopoverRoot, useEmitAsProps } from 'radix-vue'
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue'

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <PopoverRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </PopoverRoot>
</template>
