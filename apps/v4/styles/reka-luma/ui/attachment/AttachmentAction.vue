<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '../button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}>(), {
  variant: 'ghost',
  size: 'icon-xs',
})
</script>

<template>
  <Button
    data-slot="attachment-action"
    :variant="variant"
    :size="size"
    :class="cn('', props.class)"
  >
    <slot />
  </Button>
</template>
