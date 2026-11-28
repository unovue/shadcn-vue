<script setup lang="ts">
import type { PopoverTriggerProps } from '@vase-ui/vue/popover'
import { Popover } from '@vase-ui/vue/popover'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ PopoverTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Popover.Trigger ref="part" data-slot="popover-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Popover.Trigger>
</template>
