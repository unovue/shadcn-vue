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
  <Menu.RadioItem
    v-slot="{ state }"
    :value="value"
    data-slot="dropdown-menu-radio-item"
    :class="cn(
      'cn-dropdown-menu-radio-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="cn-dropdown-menu-item-indicator pointer-events-none"
      data-slot="dropdown-menu-radio-item-indicator"
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
  </Menu.RadioItem>
</template>
