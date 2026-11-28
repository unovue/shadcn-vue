<script setup lang="ts">
import type { ComboboxInputProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import { InputGroup, InputGroupAddon } from "@/registry/bases/vase/ui/input-group"

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  class?: HTMLAttributes["class"]
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <InputGroup class="cn-combobox-input w-auto">
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="Search01Icon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" class="cn-command-input-icon" />
    </InputGroupAddon>
    <Combobox.Input
      data-slot="combobox-input"
      :class="cn('flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
      v-bind="$attrs"
    />
  </InputGroup>
</template>
