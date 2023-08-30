<script setup lang="ts">
import { Toggle } from 'radix-vue'
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface ToggleProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'default',
  size: 'default',
})

const toggleClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-outline-hover hover:text-muted focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-foreground',
    {
      variants: {
        variant: {
          default: 'bg-transparent',
          outline:
            'bg-transparent border border-border hover:bg-outline-hover hover:text-muted',
        },
        size: {
          default: 'h-10 px-3',
          sm: 'h-9 px-2.5',
          lg: 'h-11 px-5',
        },
      },
    },
  )({
    variant: props.variant,
    size: props.size,
  })
})
</script>

<template>
  <Toggle :class="cn(toggleClass, props.class)">
    <slot />
  </Toggle>
</template>
