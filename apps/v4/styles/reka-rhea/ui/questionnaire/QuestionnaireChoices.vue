<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const item = injectQuestionnaireItemContext()
</script>

<template>
  <div
    data-slot="questionnaire-choices"
    :data-shortcuts="item.shortcuts.value ?? undefined"
    :class="cn('gap-3 group/questionnaire-choices grid min-w-0', props.class)"
  >
    <slot :shortcuts="item.shortcuts.value" />
  </div>
</template>
