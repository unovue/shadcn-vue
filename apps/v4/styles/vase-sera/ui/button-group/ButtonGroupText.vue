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
    :class="cn('gap-2 border border-transparent border-b-input bg-transparent px-2.5 text-xs font-semibold [&_svg:not([class*=size-])]:size-3.5 group-has-[>[data-variant=outline]]/button-group:border-border uppercase flex items-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </component>
</template>
