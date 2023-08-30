<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface ButtonProps {
  class?: string
  variant?:
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'neutral'
  disabled?: boolean | undefined
  as?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  disabled: false,
  as: 'button',
})

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center text-sm px-4 py-2.5 rounded-md font-medium transition-colors ease-in-out duration-300',
    {
      variants: {
        variant: {
          primary:
            'bg-primary text-primary-foreground enabled:hover:bg-primary-hover',
          secondary:
            'bg-secondary text-secondary-foreground enabled:hover:bg-secondary-hover',
          destructive:
            'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
          outline:
            'border border-border text-foreground shadow-sm hover:bg-outline-hover',
          ghost: 'text-foreground hover:bg-outline-hover',
          link: 'text-foreground hover:underline hover:underline-offset-4',
          neutral: '',
        },
        disabled: {
          true: '!opacity-50 !cursor-not-allowed',
        },
      },
    },
  )({
    variant: props.variant,
    disabled: props.disabled,
  })
})
</script>

<template>
  <component
    :is="props.as"
    :class="cn(buttonClass, props.class)"
    :disabled="props.disabled"
  >
    <slot />
  </component>
</template>
