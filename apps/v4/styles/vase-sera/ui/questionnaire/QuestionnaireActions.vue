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
    :is="props.as"
    data-slot="questionnaire-actions"
    :class="cn(
      'gap-2 sm:min-h-10 grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
