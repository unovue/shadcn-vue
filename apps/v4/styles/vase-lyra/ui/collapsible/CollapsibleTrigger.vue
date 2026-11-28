<script setup lang="ts">
import type { CollapsibleTriggerProps } from '@vase-ui/vue/collapsible'
import { Collapsible } from '@vase-ui/vue/collapsible'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Collapsible.Trigger ref="part" data-slot="collapsible-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Collapsible.Trigger>
</template>
