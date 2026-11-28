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
    data-slot="message-footer"
    :class="cn(
      'cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
