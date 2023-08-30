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
    'inline-flex items-center font-sans justify-center text-foreground rounded font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
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
