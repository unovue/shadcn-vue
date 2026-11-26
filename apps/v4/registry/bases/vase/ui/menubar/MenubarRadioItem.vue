<script setup lang="ts">
import type { MenuRadioItemProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ MenuRadioItemProps {
  class?: HTMLAttributes["class"]
  value: MenuRadioItemProps["value"]
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
          'cn-menubar-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <span
          class="cn-menubar-radio-item-indicator pointer-events-none absolute flex items-center justify-center"
        >
          <template v-if="state.checked">
            <slot name="indicator-icon">
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            </slot>
          </template>
        </span>
        <slot />
      </div>
    </template>
  </Menu.RadioItem>
</template>
