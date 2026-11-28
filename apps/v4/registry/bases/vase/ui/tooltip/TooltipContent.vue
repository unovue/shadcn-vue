<script setup lang="ts">
import type { TooltipPopupProps, TooltipPositionerProps } from "@vase-ui/vue/tooltip"
import type { HTMLAttributes } from "vue"
import { Tooltip } from "@vase-ui/vue/tooltip"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ TooltipPopupProps {
  class?: HTMLAttributes["class"]
  side?: TooltipPositionerProps["side"]
  sideOffset?: TooltipPositionerProps["sideOffset"]
  align?: TooltipPositionerProps["align"]
  alignOffset?: TooltipPositionerProps["alignOffset"]
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: "top",
  sideOffset: 4,
  align: "center",
  alignOffset: 0,
})

function onBeforeEnter(el: Element) {
  el.removeAttribute("data-closed")
  el.setAttribute("data-open", "")
}

function onBeforeLeave(el: Element) {
  el.removeAttribute("data-open")
  el.setAttribute("data-closed", "")
}
</script>

<template>
  <Tooltip.Portal>
    <Tooltip.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Tooltip.Popup
          data-slot="tooltip-content"
          v-bind="$attrs"
          :class="cn('cn-tooltip-content cn-tooltip-content-logical w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background', props.class)"
        >
          <slot />

          <Tooltip.Arrow class="cn-tooltip-arrow cn-tooltip-arrow-logical z-50 bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </Tooltip.Popup>
      </Transition>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</template>
