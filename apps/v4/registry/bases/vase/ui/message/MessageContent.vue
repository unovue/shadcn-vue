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
    data-slot="message-content"
    :class="cn(
      'cn-message-content flex w-full min-w-0 flex-col wrap-break-word',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
