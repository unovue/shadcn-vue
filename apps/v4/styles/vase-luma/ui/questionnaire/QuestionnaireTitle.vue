<script setup lang="ts">
import type { Component, ComponentPublicInstance, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  id?: string
}>(), {
  as: 'legend',
})

const item = injectQuestionnaireItemContext()

const titleRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
const fallbackId = props.id ?? useId()

let unregisterTitle: (() => void) | null = null

onMounted(() => {
  const part = titleRef.value
  const element = (part && '$el' in part ? part.$el : part) as HTMLElement | null

  // A legend already names the fieldset. Anything else, for example a
  // DialogTitle given to `as`, has to name it explicitly.
  if (!element || element.tagName === 'LEGEND') {
    return
  }

  if (!element.id) {
    element.id = fallbackId
  }

  unregisterTitle = item.registerTitle(element.id)
})

onBeforeUnmount(() => unregisterTitle?.())
</script>

<template>
  <component
    v-bind="props.id ? { id: props.id } : {}"
    :is="props.as"
    ref="titleRef"
    data-slot="questionnaire-title"
    :class="cn('text-base font-semibold [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5 cn-font-heading text-pretty', props.class)"
  >
    <slot />
  </component>
</template>
