<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()
const { scrollTo, selectedIndex, scrollSnaps, orientation } = useCarousel()
</script>

<template>
  <div
    :class="cn('flex gap-2 justify-center relative -translate-x-1/2 left-1/2', { 'top-10': orientation === 'vertical' }, props.class)"
  >
    <div
      v-for="(_, index) in scrollSnaps" :key="index" class="w-2 h-2 rounded-full"
      :class="cn(index === selectedIndex ? 'border-transparent bg-primary' : 'bg-border')" @click="scrollTo(index)"
    />
  </div>
</template>
