<script setup lang="ts">
import type { SeparatorProps } from "@vase-ui/vue/separator"
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { Separator } from "@/registry/bases/vase/ui/separator"

interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    :class="cn('cn-item-separator', props.class)"
  />
</template>
