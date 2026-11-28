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
  <Menu.CheckboxItem>
    <template #element="{ props: itemProps, elementRef, state }">
      <div
        v-bind="itemProps"
        :ref="elementRef"
        data-slot="menubar-checkbox-item"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'cn-menubar-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <span
          class="cn-menubar-checkbox-item-indicator pointer-events-none absolute flex items-center justify-center"
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
  </Menu.CheckboxItem>
</template>
