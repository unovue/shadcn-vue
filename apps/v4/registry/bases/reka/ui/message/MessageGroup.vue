<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}
const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="message-group"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'cn-message-group flex min-w-0 flex-col',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
