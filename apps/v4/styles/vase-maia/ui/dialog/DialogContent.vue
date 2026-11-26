<script setup lang="ts">
import type { DialogPopupProps } from '@vase-ui/vue/dialog'

import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { Dialog } from '@vase-ui/vue/dialog'
import { cn } from 'cn'
import { Button } from '@/styles/vase-maia/ui/button'
import DialogOverlay from './DialogOverlay.vue'

interface Props extends /* @vue-ignore */ DialogPopupProps {
  class?: HTMLAttributes['class']
  showCloseButton?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
})

function onBeforeEnter(el: Element) {
  el.removeAttribute('data-closed')
  el.setAttribute('data-open', '')
}

function onBeforeLeave(el: Element) {
  el.removeAttribute('data-open')
  el.setAttribute('data-closed', '')
}
</script>

<template>
  <Dialog.Portal>
    <DialogOverlay />
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <Dialog.Popup
        data-slot="dialog-content"
        v-bind="$attrs"
        :class="cn('bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/5 grid max-w-[calc(100%-2rem)] gap-6 rounded-4xl p-6 text-sm ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none', props.class)"
      >
        <slot />

        <Dialog.Close v-if="showCloseButton" data-slot="dialog-close">
          <template #element="{ props: closeProps, elementRef }">
            <Button v-bind="closeProps" :ref="elementRef" variant="ghost" class="absolute top-4 right-4" size="icon-sm">
              <XIcon />
              <span class="sr-only">Close</span>
            </Button>
          </template>
        </Dialog.Close>
      </Dialog.Popup>
    </Transition>
  </Dialog.Portal>
</template>
