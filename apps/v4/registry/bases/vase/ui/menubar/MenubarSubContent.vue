<script setup lang="ts">
import type { MenuPopupProps, MenuPositionerProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ MenuPopupProps {
  class?: HTMLAttributes["class"]
  side?: MenuPositionerProps["side"]
  sideOffset?: MenuPositionerProps["sideOffset"]
  align?: MenuPositionerProps["align"]
  alignOffset?: MenuPositionerProps["alignOffset"]
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

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
  <Menu.Portal>
    <Menu.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50 outline-none"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Menu.Popup
          data-slot="menubar-sub-content"
          v-bind="$attrs"
          :class="cn('cn-menubar-sub-content cn-menubar-content-logical cn-menu-target cn-menu-translucent z-50 origin-(--transform-origin) overflow-hidden', props.class)"
        >
          <slot />
        </Menu.Popup>
      </Transition>
    </Menu.Positioner>
  </Menu.Portal>
</template>
