<script setup lang="ts">
import type { DialogPopupProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { Dialog } from "@vase-ui/vue/dialog"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"
import { Button } from "@/registry/bases/vase/ui/button"
import SheetOverlay from "./SheetOverlay.vue"

interface Props extends /* @vue-ignore */ DialogPopupProps {
  class?: HTMLAttributes["class"]
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: "right",
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
    <SheetOverlay />
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <Dialog.Popup
        data-slot="sheet-content"
        :data-side="side"
        v-bind="$attrs"
        :class="cn('cn-sheet-content data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10', props.class)"
      >
        <slot />

        <Dialog.Close v-if="showCloseButton" data-slot="sheet-close">
          <template #element="{ props: closeProps, elementRef }">
            <Button v-bind="closeProps" :ref="elementRef" variant="ghost" class="cn-sheet-close" size="icon-sm">
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
