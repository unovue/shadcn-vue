<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "cn"
import { DialogTitle } from "reka-ui"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogTitle
    data-slot="sheet-title"
    :class="cn('text-foreground font-semibold', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
