<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/bases/reka/ui/button"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogCancel } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/bases/reka/ui/button"

const props = withDefaults(
  defineProps<AlertDialogCancelProps & {
    class?: HTMLAttributes["class"]
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
  }>(),
  {
    variant: "outline",
    size: "default",
  },
)

const delegatedProps = reactiveOmit(props, "class", "variant", "size")
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(
      buttonVariants({ variant, size }),
      'mt-2 sm:mt-0',
      props.class,
    )"
  >
    <slot />
  </AlertDialogCancel>
</template>
