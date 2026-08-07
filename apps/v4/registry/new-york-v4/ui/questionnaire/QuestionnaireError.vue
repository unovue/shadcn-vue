<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { computed, onBeforeUnmount, useId } from "vue"
import { cn } from "@/lib/utils"
import { injectQuestionnaireItemContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
  id?: string
}>(), {
  as: "p",
})

const item = injectQuestionnaireItemContext()

const errorId = props.id ?? useId()
const unregisterError = item.registerError(errorId)

const fallback = computed(() =>
  item.required.value
    ? "Choose an answer to continue."
    : "Choose an answer or skip this question.")

onBeforeUnmount(unregisterError)
</script>

<template>
  <Primitive
    :id="errorId"
    data-slot="questionnaire-error"
    :as="props.as"
    :as-child="props.asChild"
    :data-invalid="item.invalid.value ? '' : undefined"
    :hidden="!item.invalid.value"
    :role="item.invalid.value ? 'alert' : undefined"
    :class="cn('text-sm text-destructive', props.class)"
  >
    <slot :invalid="item.invalid.value">
      {{ fallback }}
    </slot>
  </Primitive>
</template>
