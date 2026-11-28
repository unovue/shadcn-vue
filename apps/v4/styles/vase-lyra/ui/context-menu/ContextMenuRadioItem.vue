<script setup lang="ts">
import type { ContextMenuRadioItemProps } from '@vase-ui/vue/context-menu'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ContextMenuRadioItemProps {
  class?: HTMLAttributes['class']
  value: ContextMenuRadioItemProps['value']
}

const props = defineProps<Props>()
</script>

<template>
  <ContextMenu.RadioItem
    v-slot="{ state }"
    :value="value"
    data-slot="context-menu-radio-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground gap-2 rounded-none py-2 pr-8 pl-2 text-xs data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="absolute right-2 pointer-events-none"
    >
      <template v-if="state.checked">
        <slot name="indicator-icon">
          <CheckIcon />
        </slot>
      </template>
    </span>
    <slot />
  </ContextMenu.RadioItem>
</template>
