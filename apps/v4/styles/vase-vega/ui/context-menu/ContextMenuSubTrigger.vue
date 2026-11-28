<script setup lang="ts">
import type { ContextMenuSubmenuTriggerProps } from '@vase-ui/vue/context-menu'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ContextMenuSubmenuTriggerProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <ContextMenu.SubmenuTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground rounded-sm px-2 py-1.5 text-sm data-inset:pl-8 [&_svg:not([class*=size-])]:size-4 flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
    <ChevronRightIcon class="cn-rtl-flip ml-auto" />
  </ContextMenu.SubmenuTrigger>
</template>
