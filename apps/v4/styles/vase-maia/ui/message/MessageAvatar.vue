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
    data-slot="message-avatar"
    :class="cn(
      'min-w-8 group-has-data-[slot=message-footer]/message:-translate-y-8 flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
