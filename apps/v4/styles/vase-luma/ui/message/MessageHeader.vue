<script lang='ts' setup>
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
    data-slot="message-header"
    :class="cn(
      'text-xs font-medium text-muted-foreground px-3.5 group-has-data-[variant=ghost]/message:px-0 flex max-w-full min-w-0 items-center',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
