<script setup lang="ts">
import { useCarousel } from './useCarousel'
import { cn } from '@/lib/utils'

const { orientation } = useCarousel()
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </div>
</template>
