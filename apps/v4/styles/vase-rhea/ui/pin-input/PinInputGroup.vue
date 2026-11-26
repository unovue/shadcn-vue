<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    data-slot="pin-input-group"
    :class="cn('flex items-center', props.class)"
  >
    <slot />
  </component>
</template>
