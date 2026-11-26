<script setup lang="ts" generic="Value, Multiple extends boolean | undefined = false, Item = Value">
import type { ComboboxRootEmits, ComboboxRootProps } from "@vase-ui/vue/combobox"
import { Combobox } from "@vase-ui/vue/combobox"

interface Props extends /* @vue-ignore */ ComboboxRootProps<Value, Multiple, Item> {}
interface Emits extends /* @vue-ignore */ ComboboxRootEmits<Value, Multiple> {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Combobox.Root data-slot="combobox">
    <slot />
  </Combobox.Root>
</template>
