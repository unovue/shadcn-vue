<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, useId } from 'vue'
import { cn } from '@/lib/utils'
import { injectQuestionnaireItemContext } from './useQuestionnaire'

const props = defineProps<{
  class?: HTMLAttributes['class']
  id?: string
}>()

const item = injectQuestionnaireItemContext()

const descriptionId = props.id ?? useId()
const unregisterDescription = item.registerDescription(descriptionId)

onBeforeUnmount(unregisterDescription)
</script>

<template>
  <p
    :id="descriptionId"
    data-slot="questionnaire-description"
    :class="cn('text-sm normal-case tracking-normal text-pretty text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
