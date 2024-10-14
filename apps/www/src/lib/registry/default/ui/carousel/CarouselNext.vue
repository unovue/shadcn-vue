<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { Button } from '@/lib/registry/default/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn(
      'touch-manipulation absolute h-8 w-8 rounded-full p-0',
      orientation === 'horizontal'
        ? '-right-12 top-1/2 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
