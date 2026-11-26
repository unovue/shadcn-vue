<script setup lang="ts">
import type { ContextMenuSubmenuTriggerProps } from "@vase-ui/vue/context-menu"
import type { HTMLAttributes } from "vue"
import { ContextMenu } from "@vase-ui/vue/context-menu"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ ContextMenuSubmenuTriggerProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <ContextMenu.SubmenuTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    :class="cn(
      'cn-context-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
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
      class="cn-rtl-flip ml-auto"
    />
  </ContextMenu.SubmenuTrigger>
</template>
