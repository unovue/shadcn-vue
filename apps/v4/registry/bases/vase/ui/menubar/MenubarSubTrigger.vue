<script setup lang="ts">
import type { MenuSubmenuTriggerProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ MenuSubmenuTriggerProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.SubmenuTrigger>
    <template #element="{ props: triggerProps, elementRef, state }">
      <div
        v-bind="triggerProps"
        :ref="elementRef"
        data-slot="menubar-sub-trigger"
        :data-inset="inset ? '' : undefined"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'cn-menubar-sub-trigger flex cursor-default items-center outline-none select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground',
          props.class,
        )"
      >
        <slot />
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
          class="cn-rtl-flip ml-auto size-4"
        />
      </div>
    </template>
  </Menu.SubmenuTrigger>
</template>
