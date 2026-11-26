<script setup lang="ts">
import type { PreviewCardRootEmits, PreviewCardRootProps } from "@vase-ui/vue/preview-card"
import { PreviewCard } from "@vase-ui/vue/preview-card"

interface Props extends /* @vue-ignore */ PreviewCardRootProps {}
interface Emits extends /* @vue-ignore */ PreviewCardRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <PreviewCard.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </PreviewCard.Root>
</template>
