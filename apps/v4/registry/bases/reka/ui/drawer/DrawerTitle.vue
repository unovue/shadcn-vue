<script lang="ts" setup>
import type { DrawerTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DrawerTitle } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DrawerTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="delegatedProps"
    :class="cn('cn-drawer-title cn-font-heading', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>
