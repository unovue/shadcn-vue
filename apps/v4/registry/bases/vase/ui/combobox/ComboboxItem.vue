<script setup lang="ts">
import type { ComboboxItemProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ComboboxItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Item
    data-slot="combobox-item"
    :class="cn('cn-combobox-item group/combobox-item relative flex w-full cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)"
  >
    <slot />
  </Combobox.Item>
</template>
