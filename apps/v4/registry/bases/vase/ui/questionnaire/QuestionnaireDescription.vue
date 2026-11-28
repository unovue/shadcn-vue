<script setup lang="ts">
import type { Component, ComponentPublicInstance, HTMLAttributes } from "vue"
import { cn } from "cn"
import { onBeforeUnmount, onMounted, ref, useId } from "vue"
import { injectQuestionnaireItemContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
  id?: string
}>(), {
  as: "p",
})

const item = injectQuestionnaireItemContext()

const descriptionRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
const fallbackId = props.id ?? useId()
const descriptionId = ref(fallbackId)

let unregisterDescription = item.registerDescription(descriptionId.value)

onMounted(() => {
  // A component given to `as` can bring its own id, for example a
  // DialogDescription. Adopt it so both descriptions point at one element.
  const part = descriptionRef.value
  const element = (part && "$el" in part ? part.$el : part) as HTMLElement | null
  const renderedId = element?.id

  if (!renderedId) {
    if (element) {
      element.id = fallbackId
    }

    return
  }

  if (renderedId !== descriptionId.value) {
    unregisterDescription()
    descriptionId.value = renderedId
    unregisterDescription = item.registerDescription(renderedId)
  }
})

onBeforeUnmount(() => unregisterDescription())
</script>

<template>
  <component
    :is="props.as"
    :id="descriptionId"
    ref="descriptionRef"
    data-slot="questionnaire-description"
    :class="cn('cn-questionnaire-description text-pretty text-muted-foreground', props.class)"
  >
    <slot />
  </component>
</template>
