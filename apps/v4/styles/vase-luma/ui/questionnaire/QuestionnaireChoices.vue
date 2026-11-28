<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes['class']
}>(), {
  as: 'div',
})

const item = injectQuestionnaireItemContext()
</script>

<template>
  <component
    :is="props.as"
    data-slot="questionnaire-choices"
    :data-shortcuts="item.shortcuts.value ?? undefined"
    :class="cn('gap-3 group/questionnaire-choices grid min-w-0', props.class)"
  >
    <slot :shortcuts="item.shortcuts.value" />
  </component>
</template>
