<script setup lang="ts">
import type { SelectScrollDownArrowProps } from "@vase-ui/vue/select"
import type { HTMLAttributes } from "vue"
import { Select } from "@vase-ui/vue/select"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ SelectScrollDownArrowProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Select.ScrollDownArrow
    data-slot="select-scroll-down-button"
    :class="cn('cn-select-scroll-down-button bottom-0 w-full', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
      />
    </slot>
  </Select.ScrollDownArrow>
</template>
