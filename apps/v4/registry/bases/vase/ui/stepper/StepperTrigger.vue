<script setup lang="ts">
import type { Component, ComponentPublicInstance, HTMLAttributes } from "vue"
import { cn } from "cn"
import { onBeforeUnmount, onMounted, ref } from "vue"
import { getElement, injectStepperItemContext, injectStepperRootContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
})

const root = injectStepperRootContext()
const item = injectStepperItemContext()

const triggerRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
let registered: HTMLElement | null = null

function handleMouseDown(event: MouseEvent) {
  if (item.disabled.value) {
    return
  }

  if (root.linear.value) {
    if (item.isFocusable.value && !event.ctrlKey) {
      root.changeModelValue(item.step.value)
      return
    }
  }
  else if (!event.ctrlKey) {
    root.changeModelValue(item.step.value)
    return
  }

  event.preventDefault()
}

function handleKeyDown(event: KeyboardEvent) {
  if (item.disabled.value) {
    return
  }

  if ((event.key === "Enter" || event.key === " ") && !event.ctrlKey && !event.shiftKey) {
    if (root.linear.value && !item.isFocusable.value) {
      return
    }

    event.preventDefault()
    root.changeModelValue(item.step.value)
    return
  }

  const keys = root.orientation.value === "horizontal"
    ? ["ArrowLeft", "ArrowRight"]
    : ["ArrowUp", "ArrowDown"]

  if (!keys.includes(event.key)) {
    return
  }

  event.preventDefault()

  const horizontal = root.orientation.value === "horizontal"
  const isNextKey = event.key === (horizontal ? "ArrowRight" : "ArrowDown")
  const forward = isNextKey !== (horizontal && root.dir.value === "rtl")
  const triggers = Array.from(root.triggers)
    .sort((first, second) => first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
  const index = triggers.indexOf(event.currentTarget as HTMLElement)
  const candidates = forward ? triggers.slice(index + 1) : triggers.slice(0, index).reverse()

  candidates.find(trigger => !trigger.hasAttribute("disabled"))?.focus()
}

onMounted(() => {
  registered = getElement(triggerRef.value)

  if (registered) {
    root.triggers.add(registered)
  }
})

onBeforeUnmount(() => {
  if (registered) {
    root.triggers.delete(registered)
  }
})
</script>

<template>
  <component
    :is="as"
    ref="triggerRef"
    data-slot="stepper-trigger"
    :type="as === 'button' ? 'button' : undefined"
    :data-state="item.state.value"
    :disabled="item.disabled.value || !item.isFocusable.value ? '' : undefined"
    :data-disabled="item.disabled.value || !item.isFocusable.value ? '' : undefined"
    :data-orientation="root.orientation.value"
    :tabindex="item.isFocusable.value ? 0 : -1"
    :aria-describedby="item.descriptionId"
    :aria-labelledby="item.titleId"
    :class="cn('p-1 flex flex-col items-center text-center gap-1 rounded-md', props.class)"
    @mousedown.left="handleMouseDown"
    @keydown.enter.space.left.right.up.down="handleKeyDown"
  >
    <slot />
  </component>
</template>
