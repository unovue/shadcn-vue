<script lang="ts" setup>
import type { DrawerContentEmits, DrawerContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DrawerContent,
  DrawerHandle,
  DrawerPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import DrawerOverlay from "./DrawerOverlay.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DrawerContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DrawerContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      data-slot="drawer-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        'cn-drawer-content group/drawer-content fixed z-50',
        'will-change-transform transform-[translate3d(var(--drawer-swipe-movement-x,0px),var(--drawer-swipe-movement-y,0px),0)]',
        'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-swiping:select-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom',
        'data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top',
        'data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left',
        'data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right',
        props.class,
      )"
    >
      <DrawerHandle class="cn-drawer-handle mx-auto hidden shrink-0 group-data-[swipe-direction=down]/drawer-content:block" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
