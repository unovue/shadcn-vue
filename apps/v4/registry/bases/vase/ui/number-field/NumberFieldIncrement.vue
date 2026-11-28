<script setup lang="ts">
import type { NumberFieldIncrementProps } from "@vase-ui/vue/number-field"
import type { HTMLAttributes } from "vue"
import { NumberField } from "@vase-ui/vue/number-field"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"

interface Props extends /* @vue-ignore */ NumberFieldIncrementProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <NumberField.Increment data-slot="increment" :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 p-3', props.class)">
    <slot>
      <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="Add01Icon" phosphor="PlusIcon" remixicon="RiAddLine" class="h-4 w-4" />
    </slot>
  </NumberField.Increment>
</template>
