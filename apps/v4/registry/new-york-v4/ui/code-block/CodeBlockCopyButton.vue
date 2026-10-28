<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"

import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/new-york-v4/ui/button"
import { CheckIcon, CopyIcon } from "@lucide/vue"
import { useClipboard } from "@vueuse/core"
import { cn } from "cn"
import { Button } from "@/registry/new-york-v4/ui/button"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PrimitiveProps & {
  value: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
  variant: "ghost",
  size: "icon-xs",
})

const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true })
</script>

<template>
  <Button
    v-bind="$attrs"
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :as="as"
    :as-child="asChild"
    :variant="variant"
    :size="size"
    :aria-label="copied ? 'Copied' : 'Copy'"
    :class="cn('', props.class)"
    @click="copy(props.value)"
  >
    <CheckIcon v-if="copied" />
    <CopyIcon v-else />
  </Button>
  <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>
</template>
