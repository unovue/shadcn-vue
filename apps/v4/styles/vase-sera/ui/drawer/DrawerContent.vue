<script lang="ts" setup>
import type { DrawerPopupProps } from '@vase-ui/vue/drawer'
import type { HTMLAttributes } from 'vue'
import { Drawer } from '@vase-ui/vue/drawer'
import { cn } from 'cn'
import DrawerOverlay from './DrawerOverlay.vue'

interface Props extends /* @vue-ignore */ DrawerPopupProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

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
  <Drawer.Portal>
    <DrawerOverlay />
    <Drawer.Viewport class="fixed inset-0 z-50">
      <Transition appear @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Drawer.Popup
          data-slot="drawer-content"
          v-bind="$attrs"
          :class="cn(
            'bg-popover text-popover-foreground flex h-auto flex-col text-sm data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-none data-[swipe-direction=down]:border-t data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:rounded-none data-[swipe-direction=left]:border-r data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:rounded-none data-[swipe-direction=right]:border-l data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-none data-[swipe-direction=up]:border-b data-[swipe-direction=left]:sm:max-w-sm data-[swipe-direction=right]:sm:max-w-sm group/drawer-content fixed z-50',
            'will-change-transform transform-[translate3d(var(--drawer-swipe-movement-x,0px),var(--drawer-swipe-movement-y,0px),0)]',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-swiping:select-none',
            'data-open:animate-in data-closed:animate-out',
            'data-[swipe-direction=down]:data-open:slide-in-from-bottom data-[swipe-direction=down]:data-closed:slide-out-to-bottom',
            'data-[swipe-direction=up]:data-open:slide-in-from-top data-[swipe-direction=up]:data-closed:slide-out-to-top',
            'data-[swipe-direction=left]:data-open:slide-in-from-left data-[swipe-direction=left]:data-closed:slide-out-to-left',
            'data-[swipe-direction=right]:data-open:slide-in-from-right data-[swipe-direction=right]:data-closed:slide-out-to-right',
            props.class,
          )"
        >
          <div data-slot="drawer-handle" class="bg-muted mt-4 h-1.5 w-[100px] rounded-none mx-auto hidden shrink-0 group-data-[swipe-direction=down]/drawer-content:block" />
          <Drawer.Content class="flex min-h-0 flex-1 flex-col">
            <slot />
          </Drawer.Content>
        </Drawer.Popup>
      </Transition>
    </Drawer.Viewport>
  </Drawer.Portal>
</template>
