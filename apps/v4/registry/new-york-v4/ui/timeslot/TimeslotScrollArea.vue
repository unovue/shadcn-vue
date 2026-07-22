<script lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"

export interface TimeslotScrollAreaProps extends ScrollAreaRootProps {
  class?: HTMLAttributes["class"]
}

export interface TimeslotScrollAreaEmits {
  (type: "scrolling", value: boolean): void
}
</script>

<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
} from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<TimeslotScrollAreaProps>()

const emit = defineEmits<TimeslotScrollAreaEmits>()

const delegatedProps = reactiveOmit(props, "as", "asChild", "class")

const isScrolling = ref(false)

watch(isScrolling, (isScrolling) => {
  emit("scrolling", isScrolling)
}, {
  immediate: true,
  flush: "sync",
})

function onScrollStart() {
  isScrolling.value = true
}

function onScrollEnd() {
  isScrolling.value = false
}

const viewport = useTemplateRef("viewport")

function scrollToElement(target: HTMLElement) {
  const scrollViewport = viewport.value?.viewportElement
  if (!scrollViewport)
    return
  const top = target.offsetTop - (scrollViewport.clientHeight - target.clientHeight) / 2
  const left = target.offsetLeft - (scrollViewport.clientWidth - target.clientWidth) / 2
  scrollViewport.scrollTo({ top, left })
}

defineExpose({
  scrollToElement,
})
</script>

<template>
  <ScrollAreaRoot
    data-timeslot-scroll-area
    data-slot="scroll-area"
    v-bind="delegatedProps"
    :class="cn(
      'snap-mandatory',
      props.class,
    )"
  >
    <ScrollAreaViewport
      ref="viewport"
      as-child
      data-timeslot-scroll-area-viewport
      data-slot="scroll-area-viewport"
      class="scroll-smooth snap relative flex focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      @scroll="onScrollStart"
      @scrollend="onScrollEnd"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical" />
    <ScrollAreaScrollbar orientation="horizontal" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
