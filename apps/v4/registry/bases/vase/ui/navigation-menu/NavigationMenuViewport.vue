<script setup lang="ts">
import type { NavigationMenuPositionerProps, NavigationMenuViewportProps } from "@vase-ui/vue/navigation-menu"
import type { HTMLAttributes } from "vue"
import { NavigationMenu } from "@vase-ui/vue/navigation-menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ NavigationMenuViewportProps {
  class?: HTMLAttributes["class"]
  side?: NavigationMenuPositionerProps["side"]
  sideOffset?: NavigationMenuPositionerProps["sideOffset"]
  align?: NavigationMenuPositionerProps["align"]
  alignOffset?: NavigationMenuPositionerProps["alignOffset"]
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  sideOffset: 8,
  align: "start",
  alignOffset: 0,
})
</script>

<template>
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="cn-navigation-menu-positioner isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] data-instant:transition-none"
    >
      <Transition enter-from-class="scale-90 opacity-0" leave-to-class="scale-90 opacity-0 duration-150">
        <NavigationMenu.Popup class="cn-navigation-menu-popup relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]">
          <NavigationMenu.Viewport
            v-bind="$attrs"
            data-slot="navigation-menu-viewport"
            :class="cn('relative size-full overflow-hidden', props.class)"
          />
        </NavigationMenu.Popup>
      </Transition>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
</template>
