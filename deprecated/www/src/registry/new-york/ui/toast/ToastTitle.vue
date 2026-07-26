<script setup lang="ts">
import type { ToastTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToastTitle } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ToastTitle v-bind="delegatedProps" :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)">
    <slot />
  </ToastTitle>
</template>
