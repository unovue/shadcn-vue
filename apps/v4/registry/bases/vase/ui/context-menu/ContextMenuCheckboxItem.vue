<script setup lang="ts">
import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "@vase-ui/vue/context-menu"
import type { HTMLAttributes } from "vue"
import { ContextMenu } from "@vase-ui/vue/context-menu"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ ContextMenuCheckboxItemProps {
  class?: HTMLAttributes["class"]
}
interface Emits extends /* @vue-ignore */ ContextMenuCheckboxItemEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <ContextMenu.CheckboxItem
    v-slot="{ state }"
    data-slot="context-menu-checkbox-item"
    :class="cn(
      'cn-context-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="cn-context-menu-item-indicator pointer-events-none"
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
  </ContextMenu.CheckboxItem>
</template>
