<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"
import { computed } from "vue"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import { injectTagsInputItemContext, injectTagsInputRootContext, isEqual } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
})

const context = injectTagsInputRootContext()
const itemContext = injectTagsInputItemContext()

const disabled = computed(() => itemContext.disabled.value || context.disabled.value)

function handleDelete() {
  if (disabled.value) {
    return
  }

  context.onRemoveValue(context.modelValue.value.findIndex(tag => isEqual(tag, itemContext.value.value)))
}
</script>

<template>
  <component
    :is="as"
    data-slot="tags-input-item-delete"
    tabindex="-1"
    :aria-labelledby="itemContext.textId.value"
    :aria-current="itemContext.isSelected.value"
    :data-state="itemContext.isSelected.value ? 'active' : 'inactive'"
    :data-disabled="disabled ? '' : undefined"
    :type="as === 'button' ? 'button' : undefined"
    :class="cn('flex rounded bg-transparent mr-1', props.class)"
    @click="handleDelete"
  >
    <slot>
      <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" class="w-4 h-4" />
    </slot>
  </component>
</template>
