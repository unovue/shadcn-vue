<script setup lang="ts">
import type { ComboboxListProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ComboboxListProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.List
    data-slot="combobox-viewport"
    :class="cn('cn-combobox-list', props.class)"
  >
    <slot />
    <template v-if="$slots.item" #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </Combobox.List>
</template>
