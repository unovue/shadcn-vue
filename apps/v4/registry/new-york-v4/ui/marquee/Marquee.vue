<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface MarqueeProps extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  /** Pause the animation when the user hovers over the marquee. */
  pauseOnHover?: boolean
  /** Reverse the animation direction. */
  reverse?: boolean
  /** The orientation of the marquee. */
  orientation?: "horizontal" | "vertical"
  /** Number of times the content is repeated. More repeats ensure seamless looping for short content. */
  repeat?: number
  /** Show a gradient overlay that fades content at the edges. */
  overlay?: boolean
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  orientation: "horizontal",
  repeat: 4,
  overlay: true,
})

const delegatedProps = reactiveOmit(props, "class", "pauseOnHover", "reverse", "orientation", "repeat", "overlay")

const isVertical = computed(() => props.orientation === "vertical")
const normalizedRepeat = computed(() => Math.max(1, Math.floor(props.repeat ?? 1)))

const rootClass = computed(() => cn(
  "group relative flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
  isVertical.value ? "flex-col" : "flex-row",
  props.overlay && !isVertical.value && "before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-1/4 before:content-[''] before:bg-gradient-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-1/4 after:content-[''] after:bg-gradient-to-l after:from-background after:to-transparent",
  props.overlay && isVertical.value && "before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-1/4 before:w-full before:content-[''] before:bg-gradient-to-b before:from-background before:to-transparent after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-10 after:h-1/4 after:w-full after:content-[''] after:bg-gradient-to-t after:from-background after:to-transparent",
  props.class,
))

const contentClass = computed(() => cn(
  "flex shrink-0 justify-around [gap:var(--gap)]",
  isVertical.value
    ? "[animation:marquee-vertical_var(--duration,40s)_linear_infinite] flex-col"
    : "[animation:marquee_var(--duration,40s)_linear_infinite] flex-row",
  props.pauseOnHover && "group-hover:[animation-play-state:paused]",
  props.reverse && "[animation-direction:reverse]",
  "motion-reduce:[animation-play-state:paused]",
))
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :data-orientation="orientation"
    :class="rootClass"
  >
    <div
      v-for="i in normalizedRepeat"
      :key="i"
      :aria-hidden="i > 1 ? 'true' : undefined"
      :class="contentClass"
    >
      <slot />
    </div>
  </Primitive>
</template>

<style>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
</style>
