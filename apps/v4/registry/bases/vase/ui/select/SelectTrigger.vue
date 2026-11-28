<script setup lang="ts">
import type { SelectTriggerProps } from "@vase-ui/vue/select"
import type { HTMLAttributes } from "vue"
import { Select } from "@vase-ui/vue/select"
import { cn } from "cn"
import IconPlaceholder from "@/registry/bases/vase/components/icon-placeholder/IconPlaceholder.vue"

interface Props extends /* @vue-ignore */ SelectTriggerProps {
  class?: HTMLAttributes["class"]
  size?: "sm" | "default"
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})
</script>

<template>
  <Select.Trigger
    data-slot="select-trigger"
    :data-size="size"
    :class="cn(
      'cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
    <Select.Icon class="flex">
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        class="cn-select-trigger-icon pointer-events-none"
      />
    </Select.Icon>
  </Select.Trigger>
</template>
