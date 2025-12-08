<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import type { FormItemVariants } from "."
import { useId } from "reka-ui"
import { provide } from "vue"
import { cn } from "@/lib/utils"
import { formItemVariants } from "."
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  variant?: FormItemVariants["variant"]
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
  <div
    data-slot="form-item"
    :class="cn(formItemVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
