<script lang='ts' setup>
import type { InputGroupButtonProps } from "."
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { inputGroupButtonVariants } from "."
import Button from "../button/Button.vue"

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: "xs",
  variant: "ghost",
})
const delegatedProps = reactiveOmit(props, "size")
</script>

<template>
  <Button
    v-bind="$attrs"
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
