<script setup lang="ts">
import type { TooltipTriggerProps } from '@vase-ui/vue/tooltip'
import { Tooltip } from '@vase-ui/vue/tooltip'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ TooltipTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Tooltip.Trigger ref="part" data-slot="tooltip-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Tooltip.Trigger>
</template>
