<script lang='ts' setup>
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    data-slot="bubble-content"
    :class="cn(
      'cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
