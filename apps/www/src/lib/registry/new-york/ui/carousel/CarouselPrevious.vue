<script setup lang="ts">
import { ChevronLeftIcon } from '@radix-icons/vue'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/lib/registry/new-york/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="cn(
      'absolute h-10 w-10 rounded-full p-0',
      orientation === 'horizontal'
        ? '-left-12 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    variant="outline"
    @click="scrollPrev"
  >
    <ChevronLeftIcon class="h-4 w-4 text-white" />
  </Button>
</template>
