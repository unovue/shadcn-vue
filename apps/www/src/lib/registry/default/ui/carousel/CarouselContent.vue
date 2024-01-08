<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { useCarousel } from './useCarousel'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()

const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div ref="carouselRef" class="overflow-hidden">
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )"
    >
      <slot />
    </div>
  </div>
</template>
