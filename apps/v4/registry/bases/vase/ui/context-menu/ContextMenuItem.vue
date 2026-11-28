<script setup lang="ts">
import type { ContextMenuItemProps } from "@vase-ui/vue/context-menu"
import type { HTMLAttributes } from "vue"
import { ContextMenu } from "@vase-ui/vue/context-menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ContextMenuItemProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
  variant?: "default" | "destructive"
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
</script>

<template>
  <ContextMenu.Item
    data-slot="context-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    :class="cn(
      'cn-context-menu-item group/context-menu-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </ContextMenu.Item>
</template>
