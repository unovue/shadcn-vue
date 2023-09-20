<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed } from 'vue'

interface KbdProps {
  as?: string
  size?: 'xs' | 'sm' | 'md'
}

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  size: 'sm',
})

const kbdClass = computed(() => {
  return cva(
    'inline-flex items-center pointer-events-none h-5 select-none items-center gap-1 rounded border border-border bg-muted font-sans font-medium',
    {
      variants: {
        size: {
          xs: 'min-h-[16px] text-[10px] h-4 px-1',
          sm: 'min-h-[20px] text-[11px] h-5 px-1',
          md: 'min-h-[24px] text-[12px] h-6 px-1.5',
        },
      },
    },
  )({
    size: props.size,
  })
})
</script>

<template>
  <component :is="props.as" :class="kbdClass">
    <slot />
  </component>
</template>
