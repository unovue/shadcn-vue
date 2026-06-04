<script setup lang="ts">
import type { WithClassAsProps } from './interface'

import type { ButtonVariants } from '@/styles/reka-sera/ui/button'
import { ChevronLeftIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/styles/reka-sera/ui/button'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
  size: 'icon-sm',
})

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="cn(
      'absolute touch-manipulation',
      orientation === 'horizontal'
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeftIcon class="cn-rtl-flip" />
      <span class="sr-only">Previous slide</span>
    </slot>
  </Button>
</template>
