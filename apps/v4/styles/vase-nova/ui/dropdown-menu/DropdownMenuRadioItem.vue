<script setup lang="ts">
import type { MenuRadioItemProps } from '@vase-ui/vue/menu'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuRadioItemProps {
  class?: HTMLAttributes['class']
  value: MenuRadioItemProps['value']
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.RadioItem
    v-slot="{ state }"
    :value="value"
    data-slot="dropdown-menu-radio-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="absolute right-2 flex items-center justify-center pointer-events-none"
      data-slot="dropdown-menu-radio-item-indicator"
    >
      <template v-if="state.checked">
        <slot name="indicator-icon">
          <CheckIcon />
        </slot>
      </template>
    </span>
    <slot />
  </Menu.RadioItem>
</template>
