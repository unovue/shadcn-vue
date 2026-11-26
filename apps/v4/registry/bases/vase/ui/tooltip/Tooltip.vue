<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from "@vase-ui/vue/tooltip"
import { Tooltip } from "@vase-ui/vue/tooltip"

interface Props extends /* @vue-ignore */ TooltipRootProps {}
interface Emits extends /* @vue-ignore */ TooltipRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Tooltip.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </Tooltip.Root>
</template>
