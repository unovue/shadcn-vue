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
  variant: "default",
})

const root = injectQuestionnaireRootContext()

const visible = computed(() => root.total.value > 0 && root.last.value)
const shortcut = computed(() => (visible.value && !props.disabled ? "Enter" : null))
</script>

<template>
  <Primitive
    data-slot="questionnaire-submit"
    type="submit"
    :aria-hidden="!visible || undefined"
    :aria-disabled="props.disabled || undefined"
    :aria-keyshortcuts="shortcut ?? undefined"
    :as="props.as"
    :as-child="props.asChild"
    :data-disabled="props.disabled ? '' : undefined"
    :data-hidden="visible ? undefined : ''"
    :data-shortcut="shortcut ?? undefined"
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
      'cn-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
      props.class,
    )"
  >
    <slot>Submit</slot>
  </Primitive>
</template>
