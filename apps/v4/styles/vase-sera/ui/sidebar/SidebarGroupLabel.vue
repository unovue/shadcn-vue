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
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :class="cn(
      'text-sidebar-foreground/70 ring-sidebar-ring h-8 rounded-none px-3 text-xs font-semibold uppercase tracking-wider transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-3.5 flex shrink-0 items-center outline-hidden [&>svg]:shrink-0',
      props.class)"
  >
    <slot />
  </component>
</template>
