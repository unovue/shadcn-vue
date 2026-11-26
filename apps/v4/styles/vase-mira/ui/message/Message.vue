<script lang='ts' setup>
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  align?: 'start' | 'end'
}
const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    data-slot="message"
    :data-align="align"
    :class="cn(
      'text-xs/relaxed gap-1.5 group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
