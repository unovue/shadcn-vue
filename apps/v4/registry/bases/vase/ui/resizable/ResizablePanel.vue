<script setup lang="ts">
import type { ResizablePanelEmits, ResizablePanelProps } from "@vase-ui/vue/resizable"
import { Resizable } from "@vase-ui/vue/resizable"
import { useTemplateRef } from "vue"

interface Props extends /* @vue-ignore */ ResizablePanelProps {}
interface Emits extends /* @vue-ignore */ ResizablePanelEmits {}

defineProps<Props>()
defineEmits<Emits>()

const panel = useTemplateRef<InstanceType<typeof Resizable.Panel>>("panel")

defineExpose({
  collapse: () => panel.value?.collapse(),
  expand: () => panel.value?.expand(),
  resize: (size: number | string) => panel.value?.resize(size),
  isCollapsed: () => panel.value?.isCollapsed(),
})
</script>

<template>
  <Resizable.Panel
    ref="panel"
    data-slot="resizable-panel"
  >
    <slot />
  </Resizable.Panel>
</template>
