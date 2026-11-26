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
  <Menu.RadioItem :value="value">
    <template #element="{ props: itemProps, elementRef, state }">
      <div
        v-bind="itemProps"
        :ref="elementRef"
        data-slot="menubar-radio-item"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm data-disabled:opacity-50 data-inset:pl-8 [&_svg:not([class*=size-])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <span
          class="left-2 size-4 [&_svg:not([class*=size-])]:size-4 pointer-events-none absolute flex items-center justify-center"
        >
          <template v-if="state.checked">
            <slot name="indicator-icon">
              <CheckIcon />
            </slot>
          </template>
        </span>
        <slot />
      </div>
    </template>
  </Menu.RadioItem>
</template>
