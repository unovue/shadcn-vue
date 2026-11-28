<script setup lang="ts">
import type { PreviewCardPopupProps, PreviewCardPositionerProps } from "@vase-ui/vue/preview-card"
import type { HTMLAttributes } from "vue"
import { PreviewCard } from "@vase-ui/vue/preview-card"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ PreviewCardPopupProps {
  class?: HTMLAttributes["class"]
  side?: PreviewCardPositionerProps["side"]
  sideOffset?: PreviewCardPositionerProps["sideOffset"]
  align?: PreviewCardPositionerProps["align"]
  alignOffset?: PreviewCardPositionerProps["alignOffset"]
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
  <PreviewCard.Portal>
    <PreviewCard.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <PreviewCard.Popup
          data-slot="hover-card-content"
          v-bind="$attrs"
          :class="cn('cn-hover-card-content cn-hover-card-content-logical z-50 origin-(--transform-origin) outline-hidden', props.class)"
        >
          <slot />
        </PreviewCard.Popup>
      </Transition>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</template>
