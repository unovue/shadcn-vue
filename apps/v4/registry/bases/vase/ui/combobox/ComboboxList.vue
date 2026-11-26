<script setup lang="ts">
import type { ComboboxPopupProps, ComboboxPositionerProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ComboboxPopupProps {
  class?: HTMLAttributes["class"]
  side?: ComboboxPositionerProps["side"]
  sideOffset?: ComboboxPositionerProps["sideOffset"]
  align?: ComboboxPositionerProps["align"]
  alignOffset?: ComboboxPositionerProps["alignOffset"]
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
  <Combobox.Portal>
    <Combobox.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Combobox.Popup
          data-slot="combobox-content"
          v-bind="$attrs"
          :class="cn('cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative z-50 max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin)', props.class)"
        >
          <slot />
        </Combobox.Popup>
      </Transition>
    </Combobox.Positioner>
  </Combobox.Portal>
</template>
