<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from "@vase-ui/vue/collapsible"
import { Collapsible } from "@vase-ui/vue/collapsible"

interface Props extends /* @vue-ignore */ CollapsibleRootProps {}
interface Emits extends /* @vue-ignore */ CollapsibleRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Collapsible.Root v-slot="slotProps" data-slot="collapsible">
    <slot v-bind="slotProps" />
  </Collapsible.Root>
</template>
