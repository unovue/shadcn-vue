<script setup lang="ts">
import type { AlertDialogTriggerProps } from "@vase-ui/vue/alert-dialog"
import { AlertDialog } from "@vase-ui/vue/alert-dialog"
import { computed, useTemplateRef } from "vue"

interface Props extends /* @vue-ignore */ AlertDialogTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>("part")
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <AlertDialog.Trigger ref="part" data-slot="alert-dialog-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </AlertDialog.Trigger>
</template>
