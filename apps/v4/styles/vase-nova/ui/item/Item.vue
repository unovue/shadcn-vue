<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { ItemVariants } from '.'
import { cn } from 'cn'
import { itemVariants } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  variant?: ItemVariants['variant']
  size?: ItemVariants['size']
}>(), {
  as: 'div',
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <component
    :is="as"
    data-slot="item"
    :data-variant="variant"
    :data-size="size"
    :class="cn(itemVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
