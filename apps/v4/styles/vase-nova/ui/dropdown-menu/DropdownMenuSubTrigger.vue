<script setup lang="ts">
import type { MenuSubmenuTriggerProps } from '@vase-ui/vue/menu'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuSubmenuTriggerProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.SubmenuTrigger
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
    <ChevronRightIcon class="cn-rtl-flip ml-auto" />
  </Menu.SubmenuTrigger>
</template>
