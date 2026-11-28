<script setup lang="ts">
import type { PopoverPopupProps, PopoverPositionerProps } from "@vase-ui/vue/popover"
import type { HTMLAttributes } from "vue"
import { Popover } from "@vase-ui/vue/popover"
import { cn } from "cn"
import { inject } from "vue"
import { popoverAnchorKey } from "./Popover.vue"

interface Props extends /* @vue-ignore */ PopoverPopupProps {
  class?: HTMLAttributes["class"]
  side?: PopoverPositionerProps["side"]
  sideOffset?: PopoverPositionerProps["sideOffset"]
  align?: PopoverPositionerProps["align"]
  alignOffset?: PopoverPositionerProps["alignOffset"]
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  sideOffset: 4,
  align: "center",
  alignOffset: 0,
})

const anchor = inject(popoverAnchorKey, null)

function anchorElement() {
  return anchor?.value ?? undefined
}

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
  <Popover.Portal>
    <Popover.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :anchor="anchorElement"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Popover.Popup
          data-slot="popover-content"
          v-bind="$attrs"
          :class="
            cn(
              'cn-popover-content cn-popover-content-logical w-72 max-w-(--available-width) origin-(--transform-origin) outline-hidden',
              props.class,
            )
          "
        >
          <slot />
        </Popover.Popup>
      </Transition>
    </Popover.Positioner>
  </Popover.Portal>
</template>
