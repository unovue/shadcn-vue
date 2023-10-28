<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, type ToastRootProps, useEmitAsProps } from 'radix-vue'

import { toastVariants } from '.'
import { cn } from '@/lib/utils'

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: string
  variant?: ToastVariantProps['variant']
};

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
</script>

<template>
  <ToastRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }" :class="cn(toastVariants({
      variant: props.variant,
    }), props.class)"
  >
    <slot />
  </ToastRoot>
</template>
