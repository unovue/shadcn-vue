<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  align?: "start" | "end"
}
const props = withDefaults(defineProps<Props>(), {
  align: "start",
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="message"
    :data-align="align"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'text-sm gap-2 group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
