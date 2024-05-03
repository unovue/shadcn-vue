<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()
const { scrollTo, selectedIndex, scrollSnaps } = useCarousel()
</script>

<template>
  <div
    v-for="(_, index) in scrollSnaps"
    :key="index"
    class="sm:mt-0 first:ml-0 border-1 w-2 h-2 mt-2 ml-2 border-gray-200 border-solid rounded-full"
    :class="[cn(props.class), index === selectedIndex ? 'border-transparent bg-blue-400' : 'bg-transparent']"
    @click="scrollTo(index)"
  />
</template>
