<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from "@vase-ui/vue/collapsible"
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { Collapsible } from "@/registry/bases/vase/ui/collapsible"

interface Props extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
}
interface Emits extends /* @vue-ignore */ CollapsibleRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Collapsible
    v-slot="slotProps"
    data-slot="trace-collapsible"
    :class="cn('cn-trace-collapsible flex w-full min-w-0 flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </Collapsible>
</template>
