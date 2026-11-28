<script setup lang="ts">
import type { DialogPopupProps } from '@vase-ui/vue/dialog'

import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { Dialog } from '@vase-ui/vue/dialog'
import { cn } from 'cn'
import { Button } from '@/styles/vase-rhea/ui/button'
import SheetOverlay from './SheetOverlay.vue'

interface Props extends /* @vue-ignore */ DialogPopupProps {
  class?: HTMLAttributes['class']
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
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
    <SheetOverlay />
    <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <Dialog.Popup
        data-slot="sheet-content"
        :data-side="side"
        v-bind="$attrs"
        :class="cn('bg-popover text-popover-foreground fixed z-50 flex flex-col bg-clip-padding text-sm shadow-xl transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10', props.class)"
      >
        <slot />

        <Dialog.Close v-if="showCloseButton" data-slot="sheet-close">
          <template #element="{ props: closeProps, elementRef }">
            <Button v-bind="closeProps" :ref="elementRef" variant="ghost" class="absolute top-4 right-4 bg-secondary" size="icon-sm">
              <XIcon />
              <span class="sr-only">Close</span>
            </Button>
          </template>
        </Dialog.Close>
      </Dialog.Popup>
    </Transition>
  </Dialog.Portal>
</template>
