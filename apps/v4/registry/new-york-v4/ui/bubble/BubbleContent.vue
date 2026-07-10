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
    data-slot="bubble-content"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50 group-data-[align=end]/bubble:self-end w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
