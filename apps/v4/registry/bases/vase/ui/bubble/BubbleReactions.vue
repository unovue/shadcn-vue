<script lang='ts' setup>
import type { Component, HTMLAttributes } from "vue"
import type { BubbleReactionsVariants } from "."
import { cn } from "cn"
import { bubbleReactionsVariants } from "."

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  side?: BubbleReactionsVariants["side"]
  align?: BubbleReactionsVariants["align"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "end",
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    data-slot="bubble-reactions"
    :data-side="side"
    :data-align="align"
    :class="cn(bubbleReactionsVariants({ side, align }), props.class)"
  >
    <slot />
  </component>
</template>
