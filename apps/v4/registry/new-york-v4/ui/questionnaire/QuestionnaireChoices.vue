<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { injectQuestionnaireItemContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
}>(), {
  as: "div",
})

const item = injectQuestionnaireItemContext()
</script>

<template>
  <Primitive
    data-slot="questionnaire-choices"
    :as="props.as"
    :as-child="props.asChild"
    :data-shortcuts="item.shortcuts.value ?? undefined"
    :class="cn('gap-3 group/questionnaire-choices grid min-w-0', props.class)"
  >
    <slot :shortcuts="item.shortcuts.value" />
  </Primitive>
</template>
