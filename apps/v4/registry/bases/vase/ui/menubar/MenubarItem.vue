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
  <Menu.Item>
    <template #element="{ props: itemProps, elementRef, state }">
      <div
        v-bind="itemProps"
        :ref="elementRef"
        data-slot="menubar-item"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'cn-menubar-item group/menubar-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <slot />
      </div>
    </template>
  </Menu.Item>
</template>
