<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import { useProvideCarousel } from './useCarousel'
import type { CarouselProps } from './interface'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal',
})

const forwarded = useForwardPropsEmits(props)

const { scrollNext, scrollPrev } = useProvideCarousel(props)

function onKeyDown(event: KeyboardEvent) {
  event.preventDefault()

  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey)
    scrollPrev()

  else if (event.key === nextKey)
    scrollNext()
}
</script>

<template>
  <div
    :class="cn('relative', $attrs.class ?? '')"
    role="region"
    aria-roledescription="carousel"
    v-bind="forwarded"
    @keydown="onKeyDown"
  >
    <slot />
  </div>
</template>
