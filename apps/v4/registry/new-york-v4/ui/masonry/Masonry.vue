<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface MasonryProps extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  /** Maximum number of columns at the largest breakpoint. Scales down responsively on smaller screens. */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Gap between items using Tailwind's spacing scale. */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
}

const props = withDefaults(defineProps<MasonryProps>(), {
  gap: 4,
})

const delegatedProps = reactiveOmit(props, "class", "columns", "gap")

const columnsMap: Record<number, string> = {
  1: "columns-1",
  2: "columns-1 md:columns-2",
  3: "columns-1 md:columns-2 lg:columns-3",
  4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
  5: "columns-1 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5",
  6: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6",
  7: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 2xl:columns-7",
  8: "columns-1 sm:columns-2 md:columns-4 lg:columns-5 xl:columns-7 2xl:columns-8",
  9: "columns-1 sm:columns-2 md:columns-4 lg:columns-6 xl:columns-8 2xl:columns-9",
  10: "columns-1 sm:columns-2 md:columns-4 lg:columns-6 xl:columns-8 2xl:columns-10",
  11: "columns-1 sm:columns-3 md:columns-4 lg:columns-7 xl:columns-9 2xl:columns-11",
  12: "columns-1 sm:columns-3 md:columns-4 lg:columns-8 xl:columns-10 2xl:columns-12",
}

const gapMap: Record<number, string> = {
  0: "gap-0 *:mb-0",
  1: "gap-1 *:mb-1",
  2: "gap-2 *:mb-2",
  3: "gap-3 *:mb-3",
  4: "gap-4 *:mb-4",
  5: "gap-5 *:mb-5",
  6: "gap-6 *:mb-6",
  8: "gap-8 *:mb-8",
  10: "gap-10 *:mb-10",
  12: "gap-12 *:mb-12",
}

const columnClass = computed(() => columnsMap[props.columns ?? 3])

const gapClass = computed(() => gapMap[props.gap ?? 4] ?? gapMap[4])
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :class="cn('relative *:break-inside-avoid-column', columnClass, gapClass, props.class)"
  >
    <slot />
  </Primitive>
</template>
