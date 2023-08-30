<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive'
  as?: string
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  as: 'span',
})

const badgeClass = computed(() => {
  return cva(
    'inline-flex items-center cursor-default text-xs font-semibold px-2.5 py-0.5 rounded-md transition-colors ease-in-out duration-300',
    {
      variants: {
        variant: {
          primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
          secondary: 'bg-secondary text-foreground hover:bg-secondary-hover',
          outline:
            'border border-border text-foreground shadow-sm hover:bg-outline-hover',
          destructive:
            'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        },
      },
    },
  )({
    variant: props.variant,
  })
})
</script>

<template>
  <component :is="props.as" :class="cn(badgeClass, props.class)">
    <slot />
  </component>
</template>
