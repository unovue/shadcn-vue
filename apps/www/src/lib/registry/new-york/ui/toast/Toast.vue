<script lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: string
  variant?: ToastVariantProps['variant']
  'onUpdate:open'?: ((value: boolean) => void) | undefined
};
</script>

<script setup lang="ts">
import { ToastRoot, useEmitAsProps } from 'radix-vue'

import { toastVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<ToastProps>()
const emits = defineEmits<Omit<ToastRootEmits, 'update:open'>>()
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
