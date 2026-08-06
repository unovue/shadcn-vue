<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

injectQuestionnaireItemContext()
</script>

<template>
  <legend
    data-slot="questionnaire-title"
    :class="cn('text-xs font-semibold uppercase tracking-wide [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5 cn-font-heading text-pretty', props.class)"
  >
    <slot />
  </legend>
</template>
