<script setup lang="ts">
import { ChevronRightIcon } from '@radix-icons/vue'
import { useCarousel } from './useCarousel'
import { cn } from '@/lib/utils'
import { Button } from '@/lib/registry/default/ui/button'

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn(
      'absolute h-10 w-10 rounded-full p-0',
      orientation === 'horizontal'
        ? '-right-12 top-1/2 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      $attrs.class ?? '',
    )"
    variant="outline"
    @click="scrollNext"
  >
    <ChevronRightIcon class="h-4 w-4 text-white stroke-white" />
  </Button>
</template>
