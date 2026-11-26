<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    data-slot="bubble-group"
    :class="cn('gap-2 flex min-w-0 flex-col', props.class)"
  >
    <slot />
  </component>
</template>
