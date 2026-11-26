<script setup lang="ts">
import type { MenuItemProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ MenuItemProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
  variant?: "default" | "destructive"
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
</script>

<template>
  <Menu.Item
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    :class="cn(
      'cn-dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </Menu.Item>
</template>
