<script setup lang="ts">
import type { SelectPopupProps, SelectPositionerProps } from '@vase-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'

interface Props extends /* @vue-ignore */ SelectPopupProps {
  class?: HTMLAttributes['class']
  position?: 'item-aligned' | 'popper'
  side?: SelectPositionerProps['side']
  sideOffset?: SelectPositionerProps['sideOffset']
  align?: SelectPositionerProps['align']
  alignOffset?: SelectPositionerProps['alignOffset']
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  position: 'item-aligned',
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
  alignOffset: 0,
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
  <Select.Portal>
    <Select.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :align-item-with-trigger="position === 'item-aligned'"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Select.Popup
          data-slot="select-content"
          :data-align-trigger="position === 'item-aligned'"
          v-bind="$attrs"
          :class="cn(
            'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 rounded-none shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-target cn-menu-translucent relative z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none',
            props.class,
          )"
        >
          <SelectScrollUpButton />
          <Select.List class="max-h-(--available-height) overflow-y-auto">
            <slot />
          </Select.List>
          <SelectScrollDownButton />
        </Select.Popup>
      </Transition>
    </Select.Positioner>
  </Select.Portal>
</template>
