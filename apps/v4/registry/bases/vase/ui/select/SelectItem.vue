<script setup lang="ts">
import type { SelectItemProps } from "@vase-ui/vue/select"
import type { HTMLAttributes } from "vue"
import { Select } from "@vase-ui/vue/select"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ SelectItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Select.Item
    v-slot="{ state }"
    data-slot="select-item"
    :class="
      cn(
        'cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        props.class,
      )
    "
  >
    <span class="cn-select-item-indicator">
      <template v-if="state.selected">
        <slot name="indicator-icon">
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            class="cn-select-item-indicator-icon pointer-events-none"
          />
        </slot>
      </template>
    </span>

    <Select.ItemText>
      <slot />
    </Select.ItemText>
  </Select.Item>
</template>
