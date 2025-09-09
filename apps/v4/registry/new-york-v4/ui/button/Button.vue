<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."
import { computed } from "vue"

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  color?: ButtonVariants["color"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});

// map legacy variants → new props
const resolvedVariant = computed(() => {
  switch (props.variant) {
    case "default":
      return "solid"
    case "destructive":
      return "solid"
    case "secondary":
      return "solid"
    default:
      return props.variant
  }
});

const resolvedColor = computed(() => {
  switch (props.variant) {
    case "default":
      return "primary"
    case "destructive":
      return "error"
    case "secondary":
      return "secondary"
    default:
      return props.color ?? "primary"
  }
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        buttonVariants({
          variant: resolvedVariant,
          size,
          color: resolvedColor,
        }),
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
