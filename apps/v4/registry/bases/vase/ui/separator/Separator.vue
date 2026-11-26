<script setup lang="ts">
import type { SeparatorProps } from "@vase-ui/vue/separator"
import type { HTMLAttributes } from "vue"
import { Separator } from "@vase-ui/vue/separator"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes["class"]
  orientation?: "horizontal" | "vertical"
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
})
</script>

<template>
  <Separator
    data-slot="separator"
    :orientation="orientation"
    :data-orientation="orientation"
    :class="
      cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        props.class,
      )
    "
  />
</template>
