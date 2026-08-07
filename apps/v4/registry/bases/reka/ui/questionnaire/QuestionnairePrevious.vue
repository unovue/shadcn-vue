<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/bases/reka/ui/button"
import { Primitive } from "reka-ui"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/bases/reka/ui/button"
import { injectQuestionnaireRootContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
  disabled?: boolean
  size?: ButtonVariants["size"]
  variant?: ButtonVariants["variant"]
}>(), {
  as: "button",
  disabled: false,
  size: "default",
  variant: "outline",
})

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()

const root = injectQuestionnaireRootContext()

const visible = computed(() => root.total.value > 1 && !root.first.value)

function handleClick(event: MouseEvent) {
  emits("click", event)

  // `disabled` does not block clicks once `as` or `as-child` renders something
  // other than a button.
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (!event.defaultPrevented) {
    root.goPrevious()
  }
}
</script>

<template>
  <Primitive
    data-slot="questionnaire-previous"
    type="button"
    :aria-hidden="!visible || undefined"
    :aria-disabled="props.disabled || undefined"
    :as="props.as"
    :as-child="props.asChild"
    :data-disabled="props.disabled ? '' : undefined"
    :data-hidden="visible ? undefined : ''"
    :data-size="props.size"
    :data-status="root.activeItemStatus.value ?? undefined"
    :data-variant="props.variant"
    :data-visible="visible ? '' : undefined"
    :disabled="props.disabled"
    :hidden="!visible"
    :inert="!visible"
    :tabindex="visible ? undefined : -1"
    :class="cn(
      buttonVariants({ size: props.size, variant: props.variant }),
      'cn-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
      props.class,
    )"
    @click="handleClick"
  >
    <slot>Previous</slot>
  </Primitive>
</template>
