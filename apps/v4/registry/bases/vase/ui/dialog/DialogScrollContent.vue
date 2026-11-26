<script setup lang="ts">
import type { DialogPopupProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { Dialog } from "@vase-ui/vue/dialog"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import DialogOverlay from "./DialogOverlay.vue"

interface Props extends /* @vue-ignore */ DialogPopupProps {
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
  <Dialog.Portal>
    <DialogOverlay class="bg-black/80" />
    <Dialog.Viewport class="fixed inset-0 z-50 grid place-items-center overflow-y-auto">
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Dialog.Popup
          v-bind="$attrs"
          :class="
            cn(
              'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 sm:rounded-lg md:w-full',
              props.class,
            )
          "
        >
          <slot />

          <Dialog.Close
            class="absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
          >
            <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" class="w-4 h-4" />
            <span class="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Popup>
      </Transition>
    </Dialog.Viewport>
  </Dialog.Portal>
</template>
