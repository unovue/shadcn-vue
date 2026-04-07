<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxInput, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { IconPlaceholder } from "@/registry/bases/reka/components/icon-placeholder"
import { InputGroup, InputGroupAddon } from "@/registry/bases/reka/ui/input-group"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="Search01Icon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" class="cn-command-input-icon" />
    </InputGroupAddon>
    <ComboboxInput
      data-slot="combobox-input"
      :class="cn('cn-input-group-input flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
      v-bind="{ ...$attrs, ...forwarded }"
    />
  </InputGroup>
</template>
