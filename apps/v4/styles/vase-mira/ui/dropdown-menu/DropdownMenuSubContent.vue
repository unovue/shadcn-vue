<script setup lang="ts">
import type { MenuPopupProps, MenuPositionerProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuPopupProps {
  class?: HTMLAttributes['class']
  side?: MenuPositionerProps['side']
  sideOffset?: MenuPositionerProps['sideOffset']
  align?: MenuPositionerProps['align']
  alignOffset?: MenuPositionerProps['alignOffset']
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
          data-slot="dropdown-menu-sub-content"
          v-bind="$attrs"
          :class="cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-target cn-menu-translucent z-50 max-w-(--available-width) origin-(--transform-origin) overflow-hidden', props.class)"
        >
          <slot />
        </Menu.Popup>
      </Transition>
    </Menu.Positioner>
  </Menu.Portal>
</template>
