<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { computed, onBeforeUnmount, useId } from 'vue'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
  id?: string
}>(), {
  as: 'p',
})

const item = injectQuestionnaireItemContext()

const errorId = props.id ?? useId()
const unregisterError = item.registerError(errorId)

const fallback = computed(() =>
  item.required.value
    ? 'Choose an answer to continue.'
    : 'Choose an answer or skip this question.')

onBeforeUnmount(unregisterError)
</script>

<template>
  <component
    :is="props.as"
    :id="errorId"
    data-slot="questionnaire-error"
    :data-invalid="item.invalid.value ? '' : undefined"
    :hidden="!item.invalid.value"
    :role="item.invalid.value ? 'alert' : undefined"
    :class="cn('mt-2 text-xs text-destructive', props.class)"
  >
    <slot :invalid="item.invalid.value">
      {{ fallback }}
    </slot>
  </component>
</template>
