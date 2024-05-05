<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()
const { scrollTo, selectedIndex, scrollSnaps } = useCarousel()
</script>

<template>
  <div class="flex gap-2 justify-center">
    <div
      v-for="(_, index) in scrollSnaps"
      :key="index"
      class="border-1 w-2 h-2 rounded-full"
      :class="cn(index === selectedIndex ? 'border-transparent bg-primary' : 'bg-border', props.class)"
      @click="scrollTo(index)"
    />
  </div>
</template>
