<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-rhea/ui/button'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/styles/reka-rhea/ui/button'
import { injectQuestionnaireRootContext } from './useQuestionnaire'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  disabled?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}>(), {
  disabled: false,
  size: 'default',
  variant: 'default',
})

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()

const root = injectQuestionnaireRootContext()

const visible = computed(() => root.total.value > 1 && !root.last.value)
const shortcut = computed(() => (visible.value && !props.disabled ? 'Enter' : null))

function handleClick(event: MouseEvent) {
  emits('click', event)

  if (!event.defaultPrevented) {
    root.goNext()
  }
}
</script>

<template>
  <button
    data-slot="questionnaire-next"
    type="button"
    :aria-hidden="!visible || undefined"
    :aria-keyshortcuts="shortcut ?? undefined"
    :data-disabled="props.disabled ? '' : undefined"
    :data-hidden="visible ? undefined : ''"
    :data-shortcut="shortcut ?? undefined"
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
      'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      props.class,
    )"
    @click="handleClick"
  >
    <slot>Next</slot>
  </button>
</template>
