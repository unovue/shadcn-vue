<script setup lang="ts">
import { computed } from 'vue'
import { AvatarRoot } from 'radix-vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface AvatarProps {
  size?: 'sm' | 'base' | 'lg'
  shape?: 'circle' | 'square'
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  name: 'Anonymous',
  size: 'base',
  shape: 'circle',
})

const avatarClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center font-normal text-foregorund select-none shrink-0 bg-secondary overflow-hidden',
    {
      variants: {
        size: {
          sm: 'h-10 w-10 text-xs',
          base: 'h-16 w-16 text-2xl',
          lg: 'h-32 w-32 text-5xl',
        },
        shape: {
          circle: 'rounded-full',
          square: 'rounded-md',
        },
      },
    },
  )({
    size: props.size,
    shape: props.shape,
  })
})
</script>

<template>
  <AvatarRoot :class="cn(avatarClass, props.class)">
    <slot />
  </AvatarRoot>
</template>
