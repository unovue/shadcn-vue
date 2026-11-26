<script setup lang="ts">
import type { DialogBackdropProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { Dialog } from "@vase-ui/vue/dialog"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ DialogBackdropProps {
  class?: HTMLAttributes["class"]
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
  <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
    <Dialog.Backdrop
      data-slot="dialog-overlay"
      v-bind="$attrs"
      :class="cn('cn-dialog-overlay fixed inset-0 isolate z-50', props.class)"
    >
      <slot />
    </Dialog.Backdrop>
  </Transition>
</template>
