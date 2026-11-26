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
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :class="cn(
      'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 w-5 rounded-none p-0 focus-visible:ring-2 [&>svg]:size-4 flex aspect-square items-center justify-center outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
