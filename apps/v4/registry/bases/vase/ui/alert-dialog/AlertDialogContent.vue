<script setup lang="ts">
import type { AlertDialogPopupProps } from "@vase-ui/vue/alert-dialog"
import type { HTMLAttributes } from "vue"
import { AlertDialog } from "@vase-ui/vue/alert-dialog"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ AlertDialogPopupProps {
  class?: HTMLAttributes["class"]
  size?: "default" | "sm"
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  size: "default",
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
  <AlertDialog.Portal>
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <AlertDialog.Backdrop
        data-slot="alert-dialog-overlay"
        class="cn-alert-dialog-overlay fixed inset-0 z-50"
      />
    </Transition>
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <AlertDialog.Popup
        data-slot="alert-dialog-content"
        :data-size="size"
        v-bind="$attrs"
        :class="
          cn(
            'cn-alert-dialog-content group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none',
            props.class,
          )
        "
      >
        <slot />
      </AlertDialog.Popup>
    </Transition>
  </AlertDialog.Portal>
</template>
