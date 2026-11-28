<script setup lang="ts">
import type { DialogTriggerProps } from '@vase-ui/vue/dialog'
import { Dialog } from '@vase-ui/vue/dialog'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ DialogTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Dialog.Trigger ref="part" data-slot="dialog-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Dialog.Trigger>
</template>
