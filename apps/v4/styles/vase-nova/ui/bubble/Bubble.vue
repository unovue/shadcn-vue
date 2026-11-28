<script lang='ts' setup>
import type { Component, HTMLAttributes } from 'vue'
import type { BubbleVariants } from '.'
import { cn } from 'cn'
import { bubbleVariants } from '.'

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  variant?: BubbleVariants['variant']
  align?: 'start' | 'end'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  align: 'start',
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    data-slot="bubble"
    :data-variant="variant"
    :data-align="align"
    :class="cn(bubbleVariants({ variant }), props.class)"
  >
    <slot />
  </component>
</template>
