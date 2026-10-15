<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/bases/reka/ui/button"
import { useClipboard } from "@vueuse/core"
import { cn } from "@/lib/utils"
import IconPlaceholder from "@/registry/bases/reka/components/icon-placeholder/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"

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
    :class="cn('cn-code-block-copy-button', props.class)"
    @click="copy(props.value)"
  >
    <IconPlaceholder
      v-if="copied"
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
    />
    <IconPlaceholder
      v-else
      lucide="CopyIcon"
      tabler="IconCopy"
      hugeicons="Copy01Icon"
      phosphor="CopyIcon"
      remixicon="RiFileCopyLine"
    />
  </Button>
  <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>
</template>
