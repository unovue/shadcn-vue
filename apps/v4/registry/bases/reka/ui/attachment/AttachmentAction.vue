<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "../button"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/bases/reka/ui/button"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>(), {
  variant: "ghost",
  size: "icon-xs",
})
</script>

<template>
  <Button
    data-slot="attachment-action"
    :variant="variant"
    :size="size"
    :class="cn('cn-attachment-action', props.class)"
  >
    <slot />
  </Button>
</template>
