<script setup lang="ts">
import type { SelectScrollUpArrowProps } from "@vase-ui/vue/select"
import type { HTMLAttributes } from "vue"
import { Select } from "@vase-ui/vue/select"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ SelectScrollUpArrowProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Select.ScrollUpArrow
    data-slot="select-scroll-up-button"
    :class="cn('cn-select-scroll-up-button top-0 w-full', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronUpIcon"
        tabler="IconChevronUp"
        hugeicons="ArrowUp01Icon"
        phosphor="CaretUpIcon"
        remixicon="RiArrowUpSLine"
      />
    </slot>
  </Select.ScrollUpArrow>
</template>
