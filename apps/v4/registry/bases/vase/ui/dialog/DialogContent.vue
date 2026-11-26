<script setup lang="ts">
import type { DialogPopupProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { Dialog } from "@vase-ui/vue/dialog"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import DialogOverlay from "./DialogOverlay.vue"

interface Props extends /* @vue-ignore */ DialogPopupProps {
  class?: HTMLAttributes["class"]
  showCloseButton?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
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
  <Dialog.Portal>
    <DialogOverlay />
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <Dialog.Popup
        data-slot="dialog-content"
        v-bind="$attrs"
        :class="cn('cn-dialog-content fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none', props.class)"
      >
        <slot />

        <Dialog.Close v-if="showCloseButton" data-slot="dialog-close">
          <template #element="{ props: closeProps, elementRef }">
            <Button v-bind="closeProps" :ref="elementRef" variant="ghost" class="cn-dialog-close" size="icon-sm">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
              <span class="sr-only">Close</span>
            </Button>
          </template>
        </Dialog.Close>
      </Dialog.Popup>
    </Transition>
  </Dialog.Portal>
</template>
