<script setup lang="ts">
import type { PreviewCardTriggerProps } from '@vase-ui/vue/preview-card'
import { PreviewCard } from '@vase-ui/vue/preview-card'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ PreviewCardTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <PreviewCard.Trigger ref="part" data-slot="hover-card-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </PreviewCard.Trigger>
</template>
