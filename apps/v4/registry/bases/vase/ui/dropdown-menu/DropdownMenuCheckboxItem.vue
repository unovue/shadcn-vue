<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from "@vase-ui/vue/menu"
import type { HTMLAttributes } from "vue"
import { Menu } from "@vase-ui/vue/menu"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ MenuCheckboxItemProps {
  class?: HTMLAttributes["class"]
}
interface Emits extends /* @vue-ignore */ MenuCheckboxItemEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Menu.CheckboxItem
    v-slot="{ state }"
    data-slot="dropdown-menu-checkbox-item"
    :class="cn(
      'cn-dropdown-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="cn-dropdown-menu-item-indicator pointer-events-none"
      data-slot="dropdown-menu-checkbox-item-indicator"
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
  </Menu.CheckboxItem>
</template>
