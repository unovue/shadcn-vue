<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/vase-rhea/ui/button'
import { cn } from 'cn'
import { computed } from 'vue'
import { buttonVariants } from '@/styles/vase-rhea/ui/button'
import { injectQuestionnaireRootContext } from './useQuestionnaire'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  disabled?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}>(), {
  as: 'button',
  disabled: false,
  size: 'default',
  variant: 'outline',
})

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()

const root = injectQuestionnaireRootContext()

const visible = computed(() => root.activeItemRequired.value === false)

function handleClick(event: MouseEvent) {
  emits('click', event)

  // `disabled` does not block clicks once `as` renders something other than a
  // button.
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (!event.defaultPrevented) {
    root.skipCurrent()
  }
}
</script>

<template>
  <component
    :is="props.as"
    data-slot="questionnaire-skip"
    type="button"
    :aria-hidden="!visible || undefined"
    :aria-disabled="props.disabled || undefined"
    :data-disabled="props.disabled ? '' : undefined"
    :data-hidden="visible ? undefined : ''"
    :data-size="props.size"
    :data-status="root.activeItemStatus.value ?? undefined"
    :data-variant="props.variant"
    :data-visible="visible ? '' : undefined"
    :disabled="props.disabled"
    :hidden="!visible"
    :inert="!visible"
    :tabindex="visible ? undefined : -1"
    :class="cn(
      buttonVariants({ size: props.size, variant: props.variant }),
      'col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      props.class,
    )"
    @click="handleClick"
  >
    <slot>Skip</slot>
  </component>
</template>
