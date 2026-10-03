<script setup lang="ts">
import type { WithClassAsProps } from './interface'

import type { ButtonVariants } from '@/styles/reka-sera/ui/button'
import { ChevronRightIcon } from '@lucide/vue'
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

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute touch-manipulation',
      orientation === 'horizontal'
        ? 'inset-y-0 -right-12 my-auto'
        : 'inset-x-0 -bottom-12 mx-auto rotate-90',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <ChevronRightIcon class="cn-rtl-flip" />
      <span class="sr-only">Next slide</span>
    </slot>
  </Button>
</template>
