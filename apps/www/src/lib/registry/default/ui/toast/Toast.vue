<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ToastRootEmits, ToastRootProps } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariantProps['variant']
  'onOpenChange'?: ((value: boolean) => void) | undefined
};
</script>

<script setup lang="ts">
import { ToastRoot, useEmitAsProps } from 'radix-vue'

import { toastVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastRoot
    v-bind="{ ...delegatedProps, ...useEmitAsProps(emits) }"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
