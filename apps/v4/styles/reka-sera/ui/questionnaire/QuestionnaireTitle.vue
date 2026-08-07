<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>(), {
  as: 'legend',
})

injectQuestionnaireItemContext()
</script>

<template>
  <Primitive
    data-slot="questionnaire-title"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('text-xs font-semibold uppercase tracking-wide [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5 cn-font-heading text-pretty', props.class)"
  >
    <slot />
  </Primitive>
</template>
