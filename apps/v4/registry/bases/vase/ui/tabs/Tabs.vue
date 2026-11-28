<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "@vase-ui/vue/tabs"
import type { HTMLAttributes } from "vue"
import { Tabs } from "@vase-ui/vue/tabs"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ TabsRootProps {
  class?: HTMLAttributes["class"]
}
interface Emits extends /* @vue-ignore */ TabsRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Tabs.Root
    v-slot="slotProps"
    data-slot="tabs"
    :class="cn('cn-tabs group/tabs flex data-horizontal:flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </Tabs.Root>
</template>
