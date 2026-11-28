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

const props = withDefaults(defineProps<Props>(), {
  side: 'bottom',
  sideOffset: 8,
  align: 'start',
  alignOffset: -4,
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
          data-slot="menubar-content"
          v-bind="$attrs"
          :class="cn(
            'bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-lg p-1 shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-target cn-menu-translucent z-50 origin-(--transform-origin) overflow-hidden',
            // Vase UI sets data-instant at a move between menus. Vue keeps a leaving popup until its transition ends. Hide that popup at once, and give the popups a duration of 0.
            'data-instant:duration-0 data-instant:data-closed:hidden',
            props.class,
          )"
        >
          <slot />
        </Menu.Popup>
      </Transition>
    </Menu.Positioner>
  </Menu.Portal>
</template>
