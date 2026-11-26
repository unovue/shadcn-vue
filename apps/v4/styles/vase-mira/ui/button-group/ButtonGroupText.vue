<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '.'
import { cn } from 'cn'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    role="group"
    :data-orientation="props.orientation"
    :class="cn('bg-muted gap-2 rounded-md border px-2.5 text-xs/relaxed font-medium [&_svg:not([class*=size-])]:size-4 flex items-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </component>
</template>
