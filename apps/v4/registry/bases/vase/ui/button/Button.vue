<script setup lang="ts">
import type { ButtonProps } from "@vase-ui/vue/button"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Button } from "@vase-ui/vue/button"
import { cn } from "cn"
import { buttonVariants } from "."

interface Props extends /* @vue-ignore */ ButtonProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Button
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Button>
</template>
