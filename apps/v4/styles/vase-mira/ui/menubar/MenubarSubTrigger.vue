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
  <Menu.SubmenuTrigger>
    <template #element="{ props: triggerProps, elementRef, state }">
      <div
        v-bind="triggerProps"
        :ref="elementRef"
        data-slot="menubar-sub-trigger"
        :data-inset="inset ? '' : undefined"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs data-inset:pl-7.5 [&_svg:not([class*=size-])]:size-3.5 flex cursor-default items-center outline-none select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground',
          props.class,
        )"
      >
        <slot />
        <ChevronRightIcon class="cn-rtl-flip ml-auto size-4" />
      </div>
    </template>
  </Menu.SubmenuTrigger>
</template>
