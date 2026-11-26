<script setup lang="ts">
import type { Component, ComponentPublicInstance, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, toRef } from 'vue'
import { getElement, injectTagsInputRootContext, provideTagsInputItemContext } from '.'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  value: any
  disabled?: boolean
}>(), {
  as: 'div',
})

const context = injectTagsInputRootContext()

const itemRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
const element = shallowRef<HTMLElement | null>(null)
const value = toRef(props, 'value')
const isSelected = computed(() => !!element.value && context.selectedElement.value === element.value)
const disabled = computed(() => props.disabled || context.disabled.value)
const itemContext = provideTagsInputItemContext({
  value,
  isSelected,
  disabled,
  textId: ref(undefined),
  displayValue: computed(() => context.displayValue(value.value)),
})

let unregister: (() => void) | undefined

onMounted(() => {
  element.value = getElement(itemRef.value)

  if (element.value) {
    unregister = context.registerItem(element.value, () => value.value)
  }
})

onBeforeUnmount(() => unregister?.())
</script>

<template>
  <component
    :is="as"
    ref="itemRef"
    data-slot="tags-input-item"
    :aria-labelledby="itemContext.textId.value"
    :aria-current="isSelected"
    :data-disabled="disabled ? '' : undefined"
    :data-state="isSelected ? 'active' : 'inactive'"
    :class="cn('flex h-5 items-center rounded-md bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background', props.class)"
  >
    <slot />
  </component>
</template>
