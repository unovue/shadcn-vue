<script lang="ts" setup>
import type { DrawerBackdropProps } from '@vase-ui/vue/drawer'
import type { HTMLAttributes } from 'vue'
import { Drawer } from '@vase-ui/vue/drawer'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ DrawerBackdropProps {
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
  <Transition appear @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
    <Drawer.Backdrop
      data-slot="drawer-overlay"
      v-bind="$attrs"
      :class="cn('bg-black/30 supports-backdrop-filter:backdrop-blur-sm fixed inset-0 z-50', props.class)"
    />
  </Transition>
</template>
