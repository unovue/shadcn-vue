<script setup lang="ts">
import type { PopoverDescriptionProps } from "@vase-ui/vue/popover"
import type { HTMLAttributes } from "vue"
import { Popover } from "@vase-ui/vue/popover"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ PopoverDescriptionProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Popover.Description
    data-slot="popover-description"
    :class="cn('cn-popover-description', props.class)"
  >
    <slot />
  </Popover.Description>
</template>
